# views.py
from django.http import JsonResponse
import json
from django.http import HttpResponse
from django.db import connection

import datetime
from datetime import datetime, timedelta


import json
from django.http import HttpResponse
from django.db import connection

    

def get_task_set_id(date_of_task, user_id):
    with connection.cursor() as cursor:
        cursor.execute("""
            SELECT task_set_id 
            FROM task_set 
            WHERE date_of_task = %s AND user_id = %s
        """, [date_of_task, user_id])
        task_set_id = cursor.fetchone()

        return task_set_id[0] if task_set_id else None
    


def get_task_set_id_api(request):
    try:
        data = json.loads(request.body)
        date_of_task = data.get('date_of_task')
        user_id = data.get('user_id')

        if not (date_of_task and user_id):
            return HttpResponse("Date of task and user ID must be provided in the request body.", status=400)

        task_set_id = get_task_set_id(date_of_task, user_id)

        return HttpResponse(json.dumps({"task_set_id": task_set_id}), content_type="application/json")

    except Exception as e:
        return HttpResponse(f"An error occurred: {str(e)}", status=500)

def store_tasks(request):
    try:
        data = json.loads(request.body)
        date_of_task = data.get('date_of_task')
        user_id = data.get('user_id')
        task_name = data.get('task_name')
        task_status = data.get('task_status')

        if not (date_of_task and user_id and task_name and task_status):
            return HttpResponse("Date of task, user ID, task name, and task status must be provided in the request body.", status=400)

        task_set_id = get_task_set_id(date_of_task, user_id)

        if task_set_id is None:
            # If task_set doesn't exist, insert a new one
            with connection.cursor() as cursor:
                cursor.execute("""
                    INSERT INTO task_set (user_id, date_of_task) 
                    VALUES (%s, %s)
                """, [user_id, date_of_task])

                # Get the generated task_set_id
                task_set_id = cursor.lastrowid

        with connection.cursor() as cursor:
            cursor.execute("""
                INSERT INTO tasks (task_set_id, task_name, task_status) 
                VALUES (%s, %s, %s)
            """, [task_set_id, task_name, task_status])

        return HttpResponse(json.dumps({"message": "Task stored successfully."}), content_type="application/json")

    except Exception as e:
        return HttpResponse(f"An error occurred: {str(e)}", status=500)


def retrieve_tasks(request, task_set_id):
    try:
        query = """
        SELECT *
        FROM tasks
        WHERE task_set_id = %s
        """

        with connection.cursor() as cursor:
            cursor.execute(query, [task_set_id])
            results = cursor.fetchall()
            result_list = []
            for row in results:
                result_dict = {
                    'task_id': row[0],
                    'task_set_id': row[1],
                    'task_name': row[2],
                    'task_status': row[3],
                }
                result_list.append(result_dict)
    except Exception as e:
        return HttpResponse(f"An error occurred: {str(e)}", status=500)

    json_result = json.dumps(result_list)
    return HttpResponse(json_result, content_type="application/json")



def update_task_name(request):
    try:
        # Parse request data
        data = json.loads(request.body)
        task_id = data.get('task_id')
        task_name = data.get('task_name')

        if not (task_id and task_name):
            return HttpResponse("task_id and task_name must be provided.", status=400)

        with connection.cursor() as cursor:
            cursor.execute("""
                UPDATE tasks 
                SET task_name = %s 
                WHERE task_id = %s
            """, [task_name, task_id])

        return HttpResponse(json.dumps({"message": "Task name updated successfully."}), content_type="application/json")

    except Exception as e:
        return HttpResponse(f"An error occurred: {str(e)}", status=500)


def update_task_status(request):
    try:
        # Parse request data
        data = json.loads(request.body)
        task_id = data.get('task_id')
        task_status = data.get('task_status')

        if not (task_id and task_status):
            return HttpResponse("task_id and task_status must be provided.", status=400)

        with connection.cursor() as cursor:
            cursor.execute("""
                UPDATE tasks 
                SET task_status = %s 
                WHERE task_id = %s
            """, [task_status, task_id])

        return HttpResponse(json.dumps({"message": "Task status updated successfully."}), content_type="application/json")

    except Exception as e:
        return HttpResponse(f"An error occurred: {str(e)}", status=500)



def delete_task(request):
    try:
        # Parse request data
        data = json.loads(request.body)
        task_id = data.get('task_id')

        if not task_id:
            return HttpResponse("Task ID must be provided.", status=400)

        with connection.cursor() as cursor:
            # Delete task
            cursor.execute("""
                DELETE FROM tasks 
                WHERE task_id = %s
            """, [task_id])

        return HttpResponse(json.dumps({"message": "Task deleted successfully."}), content_type="application/json")

    except Exception as e:
        return HttpResponse(f"An error occurred: {str(e)}", status=500)


# Function to execute SQL command
def execute_insert_sql_query(query, data=None):
    try:
        with connection.cursor() as cursor:
            if data:
                cursor.execute(query, data)
            else:
                cursor.execute(query)
            connection.commit()
        return True
    except Exception as e:
        print("Error:", e)
        return False

def add_survey(request):
    if request.method == 'POST':
        input_data = json.loads(request.body)
        input_data = input_data["input_data"]
        for survey_data in input_data:
            print("survey data is",survey_data)
            survey_title = survey_data['survey']['title']
            survey_description = survey_data['survey']['description']
            survey_insert_query = "INSERT INTO surveys (survey_name, survey_description) VALUES (%s, %s)"
            survey_insert_data = (survey_title, survey_description)
            execute_insert_sql_query(survey_insert_query, survey_insert_data)
            
            with connection.cursor() as cursor:
                cursor.execute(survey_insert_query, survey_insert_data)
                survey_id = cursor.lastrowid

            questions = survey_data['questions']
            for question_data in questions:
                question_text = question_data['question_text']
                question_type = question_data['type']
                survey_question_insert_query = "INSERT INTO survey_questions (survey_id, question, question_type) VALUES (%s, %s, %s)"
                survey_question_insert_data = (survey_id, question_text, question_type)
                with connection.cursor() as cursor:
                    cursor.execute(survey_question_insert_query, survey_question_insert_data)
                    question_id = cursor.lastrowid

                if question_type == 'multiple_choice':
                    choices = question_data['choices']
                    for choice in choices:
                        choice_insert_query = "INSERT INTO survey_choices (survey_question_id, choices) VALUES (%s, %s)"
                        choice_insert_data = (question_id, choice)
                        execute_insert_sql_query(choice_insert_query, choice_insert_data)

        return JsonResponse({'message': 'Data inserted successfully'})
    else:
        return JsonResponse({'error': 'Only POST requests are allowed'})
    

def execute_select_sql_query(query, data=None):
    try:
        with connection.cursor(dictionary=True) as cursor:
            if data:
                cursor.execute(query, data)
            else:
                cursor.execute(query)
            result = cursor.fetchall()
        return result
    except Exception as e:
        print("Error:", e)
        return None
    
def view_surveys(request):
    output_data = []
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM surveys")
            surveys = cursor.fetchall()

            if surveys:
                for survey in surveys:
                    survey_data = {
                        'survey': {
                            'title': survey[1],  # Assuming title is the second column
                            'description': survey[2]  # Assuming description is the third column
                        },
                        'questions': []
                    }

                    cursor.execute("SELECT * FROM survey_questions WHERE survey_id = %s", [survey[0]])
                    questions = cursor.fetchall()

                    if questions:
                        for question in questions:
                            question_data = {
                                'survey_question_id': question[0],  # Assuming survey_question_id is the first column
                                'question_text': question[2],  # Assuming question_text is the fourth column
                                'type': question[3],  # Assuming type is the third column
                            }
                            print("the question 2 is",question[3])
                            if question[3] == 'multiple_choice':
                                print("The question is multiple choice")
                                cursor.execute("SELECT choices FROM survey_choices WHERE survey_question_id = %s", [question[0]])
                                choices = cursor.fetchall()
                                if choices:
                                    question_data['choices'] = [choice[0] for choice in choices]

                            survey_data['questions'].append(question_data)

                    output_data.append(survey_data)

        return JsonResponse(output_data, safe=False)
    except Exception as e:
        print("Error:", e)
        return JsonResponse({'error': 'An error occurred while fetching surveys'}, status=500)


def delete_survey(request):
    if request.method == 'POST':
        try:
            # Extract survey_id from the request body
            data = json.loads(request.body)
            survey_id = data.get('survey_id')

            if not survey_id:
                return JsonResponse({'error': 'survey_id is required in the request body'}, status=400)

            with connection.cursor() as cursor:

                # Delete associated choices from the survey_choices table
                delete_choices_query = "DELETE FROM survey_choices WHERE survey_question_id IN (SELECT survey_question_id FROM survey_questions WHERE survey_id = %s)"
                cursor.execute(delete_choices_query, [survey_id])

                                # Delete associated questions from the survey_questions table
                delete_questions_query = "DELETE FROM survey_questions WHERE survey_id = %s"
                cursor.execute(delete_questions_query, [survey_id])

                # Delete the survey from the surveys table
                delete_survey_query = "DELETE FROM surveys WHERE survey_id = %s"
                cursor.execute(delete_survey_query, [survey_id])


            return JsonResponse({'message': 'Survey deleted successfully'})  # 204 No Content
        except Exception as e:
            print("Error:", e)
            return JsonResponse({'error': 'An error occurred while deleting the survey'}, status=500)
    else:
        return JsonResponse({'error': 'Only POST requests are allowed'})