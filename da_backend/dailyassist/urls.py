from django.urls import path
from . import views

urlpatterns = [
    path('storetask/', views.store_tasks, name='store_task'),
    path('retrievetask/<int:task_set_id>/', views.retrieve_tasks, name='retrieve_tasks'),
    path('update_task_name/', views.update_task_name, name='update_task_name'),
    path('update_task_status/', views.update_task_status, name='update_task_status'),
    path('deletetask/', views.delete_task, name='delete_task'),
    path('get_task_set_id/',views.get_task_set_id_api,name="get_task_set_id_api"),
    path('add_survey/',views.add_survey,name="add_survey"),
    path('view_surveys/',views.view_surveys,name="view_surveys"),
    path('delete_survey/',views.delete_survey,name="delete_survey"),
    path('view_survey_list/',views.view_survey_list ,name="view_survey_list"),
    path('view_survey_details/',views.view_survey_details,name="view_survey_details"),
    path('add_habit_challenges/', views.add_habit_challenges, name='add_habit_challenges'),
    path('delete_habit_challenges/', views.delete_habit_challenges, name='delete_habit_challenges'),
    path('view_habit_details/<int:habit_id>/', views.view_habit_details, name='view_habit_details'),
    path('list_habits/', views.list_habits, name='list_habits'),
    path('submit_survey/', views.submit_survey, name='submit_survey'),
    path('view_habit_progress/', views.view_habit_progress, name='view_habit_progress'),
    path('update_habit_progress/', views.update_habit_progress, name='update_habit_progress'),
    path('view_habit_percentages/', views.view_habit_percentages, name='view_habit_percentages'),
    path('view_survey_results/', views.view_survey_results, name='fetch_survey_results'),
    path('view_all_survey_results/', views.view_all_survey_results, name='view_all_survey_results'),

]