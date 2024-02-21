from django.urls import path
from . import views

urlpatterns = [
    path('storetask/', views.store_tasks, name='store_task'),
    path('retrievetask/<int:task_set_id>/', views.retrieve_tasks, name='retrieve_tasks'),
    path('update_task_name/', views.update_task_name, name='update_task_name'),
    path('update_task_status/', views.update_task_status, name='update_task_status'),
    path('deletetask/', views.delete_task, name='delete_task'),
    path('get_task_set_id/',views.get_task_set_id_api,name="get_task_set_id_api")
    # Add more URL patterns as needed
]