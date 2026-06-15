from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import TaskViewSet, TaskListViewSet

router = DefaultRouter()
router.register(r'lists', TaskListViewSet, basename='tasklist')
router.register(r'', TaskViewSet, basename='task')
urlpatterns = router.urls
