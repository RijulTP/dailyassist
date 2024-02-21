from django.urls import path
from . import views

urlpatterns = [
    path('storetask/', views.store_tasks, name='store_task'),
    path('retrievetask/<int:task_set_id>/', views.retrieve_tasks, name='retrieve_tasks'),
    path('updatetask/', views.update_task, name='update_task'),
    path('deletetask/', views.delete_task, name='delete_task'),
    # Add more URL patterns as needed
]