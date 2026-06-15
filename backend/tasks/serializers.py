from rest_framework import serializers
from .models import Task, TaskList

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'task_list', 'title', 'description', 'status', 'deadline', 'completed_at', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at', 'completed_at']

class TaskListSerializer(serializers.ModelSerializer):
    tasks = TaskSerializer(many=True, read_only=True)
    task_count = serializers.SerializerMethodField()

    class Meta:
        model = TaskList
        fields = ['id', 'name', 'description', 'tasks', 'task_count', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

    def get_task_count(self, obj):
        return obj.tasks.filter(status='active', deleted_at__isnull=True).count()

class TaskListDetailSerializer(serializers.ModelSerializer):
    active_tasks = serializers.SerializerMethodField()
    completed_tasks = serializers.SerializerMethodField()

    class Meta:
        model = TaskList
        fields = ['id', 'name', 'description', 'active_tasks', 'completed_tasks', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

    def get_active_tasks(self, obj):
        tasks = obj.tasks.filter(status='active', deleted_at__isnull=True).order_by('deadline', '-created_at')
        return TaskSerializer(tasks, many=True).data

    def get_completed_tasks(self, obj):
        tasks = obj.tasks.filter(status='completed', deleted_at__isnull=True).order_by('-completed_at')
        return TaskSerializer(tasks, many=True).data
