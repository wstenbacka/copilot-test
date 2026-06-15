from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.utils import timezone
from datetime import timedelta
from .models import Task, TaskList
from .serializers import TaskSerializer, TaskListSerializer, TaskListDetailSerializer

class TaskListViewSet(viewsets.ModelViewSet):
    serializer_class = TaskListSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return TaskList.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=False, methods=['get'])
    def all_lists(self, request):
        lists = self.get_queryset()
        serializer = TaskListDetailSerializer(lists, many=True)
        return Response(serializer.data)

class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Task.objects.filter(task_list__user=self.request.user, deleted_at__isnull=True)

    @action(detail=True, methods=['post'])
    def mark_complete(self, request, pk=None):
        task = self.get_object()
        task.status = 'completed'
        task.completed_at = timezone.now()
        task.save()
        return Response(TaskSerializer(task).data)

    @action(detail=True, methods=['post'])
    def mark_active(self, request, pk=None):
        task = self.get_object()
        task.status = 'active'
        task.completed_at = None
        task.save()
        return Response(TaskSerializer(task).data)

    @action(detail=True, methods=['post'])
    def soft_delete(self, request, pk=None):
        task = self.get_object()
        task.deleted_at = timezone.now()
        task.save()
        return Response({'message': 'Task marked for deletion'})
