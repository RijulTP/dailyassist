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


def view_survey_list(request):
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT survey_id, survey_name, survey_description FROM surveys")
            surveys = cursor.fetchall()

            survey_list = []
            for survey in surveys:
                survey_data = {
                    'survey_id': survey[0],
                    'survey_name': survey[1],
                    'survey_description': survey[2]
                }
                survey_list.append(survey_data)

        return JsonResponse({'surveys': survey_list}, safe=False)
    except Exception as e:
        print("Error:", e)
        return JsonResponse({'error': 'An error occurred while fetching survey list'}, status=500)

def view_survey_details(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            survey_id = data.get('survey_id')

            if not survey_id:
                return JsonResponse({'error': 'survey_id is required in the request body'}, status=400)

            with connection.cursor() as cursor:
                # Fetch survey name and description
                cursor.execute("SELECT survey_name, survey_description FROM surveys WHERE survey_id = %s", [survey_id])
                survey_info = cursor.fetchone()
                if not survey_info:
                    return JsonResponse({'error': 'Survey not found'}, status=404)

                survey_name, survey_description = survey_info

                # Fetch questions
                cursor.execute("SELECT survey_question_id, question, question_type FROM survey_questions WHERE survey_id = %s", [survey_id])
                questions = cursor.fetchall()

                survey_details = {
                    'survey_id': survey_id,
                    'survey_name': survey_name,
                    'survey_description': survey_description,
                    'questions': []
                }

                for question in questions:
                    question_data = {
                        'question_id': question[0],
                        'question_text': question[1],
                        'type': question[2],
                        'choices': []
                    }

                    if question[2] == 'multiple_choice':
                        cursor.execute("SELECT choices FROM survey_choices WHERE survey_question_id = %s", [question[0]])
                        choices = cursor.fetchall()
                        for choice in choices:
                            question_data['choices'].append(choice[0])

                    survey_details['questions'].append(question_data)

            return JsonResponse({'survey_details': survey_details}, safe=False)
        except Exception as e:
            print("Error:", e)
            return JsonResponse({'error': 'An error occurred while fetching survey details'}, status=500)
    else:
        return JsonResponse({'error': 'Only POST requests are allowed for this API'})

    
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
    
def add_habit_challenges(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            habit_id = data.get('habit_id')
            challenges = data.get('challenges')

            print("Inside challenge adding")

            # Validate input
            if not habit_id or not challenges:
                return JsonResponse({'error': 'habit_id and challenges are required'}, status=400)

            with connection.cursor() as cursor:
                for day, challenge in challenges.items():
                    cursor.execute("INSERT INTO habit_challenges (habit_id, day, challenge_name) VALUES (%s, %s, %s)", [habit_id, day, challenge])

            return JsonResponse({'message': 'Challenges added successfully'}, status=201)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Only POST requests are allowed'}, status=405)

def view_habit_details(request, habit_id):
    if request.method == 'GET':
        try:
            with connection.cursor() as cursor:
                cursor.execute("""
                    SELECT habit_name
                    FROM habits
                    WHERE habit_id = %s
                """, [habit_id])
                habit_row = cursor.fetchone()

                cursor.execute("""
                    SELECT day, challenge_name
                    FROM habit_challenges
                    WHERE habit_id = %s
                """, [habit_id])
                challenges_rows = cursor.fetchall()

            if habit_row:
                habit_name = habit_row[0]
                challenges = {row[0]: row[1] for row in challenges_rows}
                response_data = {
                    'habit_name': habit_name,
                    'challenges': challenges
                }
                return JsonResponse(response_data, status=200)
            else:
                return JsonResponse({'error': 'Habit with the specified ID does not exist'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Only GET requests are allowed'}, status=405)
    
def list_habits(request):
    with connection.cursor() as cursor:
        cursor.execute("SELECT habit_id, habit_name FROM habits;")
        habits = cursor.fetchall()
    
    habits_list = []
    for habit in habits:
        habits_list.append({
            'id': habit[0],
            'name': habit[1],
        })

    return JsonResponse({'habits': habits_list})

def view_habit_percentages(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            user_id = data.get('user_id')
            with connection.cursor() as cursor:
                cursor.execute("""
                    SELECT habits.habit_id, habits.habit_name, habit_progress.last_completed_day
                    FROM habits
                    LEFT JOIN habit_progress ON habits.habit_id = habit_progress.habit_id AND habit_progress.user_id = %s
                """, [user_id])
                habits_progress = cursor.fetchall()
                
            habits_list = []
            for habit_progress in habits_progress:
                habit_id = habit_progress[0]
                habit_name = habit_progress[1]
                last_completed_day = habit_progress[2] if habit_progress[2] else 0
                total_days = 21
                percentage = round((last_completed_day / total_days) * 100, 2) if total_days > 0 else 0
                
                habits_list.append({
                    'id': habit_id,
                    'name': habit_name,
                    'last_completed_day': last_completed_day,
                    'percentage': percentage
                })

            return JsonResponse({'habits': habits_list}, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Only POST requests are allowed'}, status=405)


def delete_habit_challenges(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            habit_id = data.get('habit_id')

            if not habit_id:
                return JsonResponse({'error': 'habit_id is required'}, status=400)

            with connection.cursor() as cursor:
                cursor.execute("DELETE FROM habit_challenges WHERE habit_id = %s", [habit_id])
            
            return JsonResponse({'message': 'Habit challenges deleted successfully'})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Only POST requests are allowed'}, status=405)
    
def submit_survey(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            user_id = data.get('user_id')
            survey_id = data.get('survey_id')
            answer_json = json.dumps(data.get('answer_json'))
            survey_response_date = datetime.now().date()

            if user_id is None or survey_id is None or answer_json is None:
                return JsonResponse({'error': 'Missing required fields'}, status=400)

            with connection.cursor() as cursor:
                sql = "INSERT INTO survey_result (user_id, survey_id, answer_json, survey_response_date) VALUES (%s, %s, %s, %s)"
                cursor.execute(sql, [user_id, survey_id, answer_json, survey_response_date])

            return JsonResponse({'message': 'Survey result submitted successfully'}, status=201)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    else:
        return JsonResponse({'error': 'Only POST requests are allowed'}, status=405)
    

def view_habit_progress(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            user_id = data.get('user_id')
            habit_id = data.get('habit_id')
            with connection.cursor() as cursor:
                cursor.execute("""
                    SELECT last_completed_day
                    FROM habit_progress
                    WHERE habit_id = %s AND user_id = %s
                """, [habit_id, user_id])
                progress_row = cursor.fetchone()
                if progress_row:
                    last_completed_day = progress_row[0]
                    response_data = {'last_completed_day': last_completed_day}
                    return JsonResponse(response_data, status=200)
                else:
                    last_completed_day = 0
                    insert_query = """
                            INSERT INTO habit_progress (habit_id, user_id, last_completed_day) 
                            VALUES (%s, %s, %s)
                    """
                    cursor.execute(insert_query,[habit_id,user_id,last_completed_day])
                    response_data = {'last_completed_day': last_completed_day}
                    return JsonResponse(response_data, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Only GET requests are allowed'}, status=405)

def update_habit_progress(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            user_id = data.get('user_id')
            habit_id = data.get('habit_id')
            last_completed_day = data.get('last_completed_day')

            print(user_id,habit_id,last_completed_day)

            with connection.cursor() as cursor:
                # Check if the record already exists
                check_query = """
                    SELECT COUNT(*) FROM habit_progress 
                    WHERE habit_id = %s AND user_id = %s
                """
                cursor.execute(check_query, (habit_id, user_id))
                existing_records_count = cursor.fetchone()[0]

                if existing_records_count > 0:
                    # Update the existing record
                    update_query = """
                        UPDATE habit_progress 
                        SET last_completed_day = %s 
                        WHERE habit_id = %s AND user_id = %s
                    """
                    cursor.execute(update_query, (last_completed_day, habit_id, user_id))
                else:
                    # Insert a new record
                    insert_query = """
                        INSERT INTO habit_progress (habit_id, user_id, last_completed_day) 
                        VALUES (%s, %s, %s)
                    """
                    cursor.execute(insert_query, (habit_id, user_id, last_completed_day))


            print("The last completed day is ",last_completed_day)

            return JsonResponse({'success': True}, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Only POST requests are allowed'}, status=405)
    


def view_survey_results(request):
    if request.method == 'POST':
        try:
            # Get user_id and survey_id from the query parameters
            data = json.loads(request.body)
            user_id = data.get('user_id')
            survey_id = data.get('survey_id')

            if user_id is None or survey_id is None:
                return JsonResponse({'error': 'Missing required fields (user_id or survey_id)'}, status=400)

            # Fetch questions for the survey_id
            with connection.cursor() as cursor:
                cursor.execute("""
                    SELECT question
                    FROM survey_questions
                    WHERE survey_id = %s
                """, [survey_id])
                questions = cursor.fetchall()

                # Create a dictionary to map sequential question IDs to questions
                question_mapping = {str(i + 1): q[0] for i, q in enumerate(questions)}

            # Fetch the latest survey result for the user_id and survey_id
            with connection.cursor() as cursor:
                cursor.execute("""
                    SELECT answer_json, survey_response_date
                    FROM survey_result
                    WHERE user_id = %s AND survey_id = %s
                    ORDER BY survey_response_date DESC
                    LIMIT 1
                """, [user_id, survey_id])
                survey_result = cursor.fetchone()

            if survey_result:
                answer_json = json.loads(survey_result[0])
                answers_with_questions = {question_mapping[q_id]: answer for q_id, answer in answer_json.items()}
                result_dict = {
                    'answer_json': answers_with_questions,
                    'survey_response_date': survey_result[1].isoformat()  # Assuming you want date in ISO format
                }
                return JsonResponse({'result': result_dict}, status=200)
            else:
                return JsonResponse({'error': 'No survey results found'}, status=404)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    else:
        return JsonResponse({'error': 'Only GET requests are allowed'}, status=405)
    

def fetch_survey_ids_attended(user_id):
    try:
        with connection.cursor() as cursor:
            cursor.execute("""
                SELECT DISTINCT survey_id
                FROM survey_result
                WHERE user_id = %s
            """, [user_id])
            survey_ids = [row[0] for row in cursor.fetchall()]
        return survey_ids
    except Exception as e:
        raise e

def fetch_latest_survey_results(user_id, survey_id):
    try:
        with connection.cursor() as cursor:
            cursor.execute("""
                SELECT question, answer_json
                FROM survey_questions
                JOIN survey_result ON survey_questions.survey_id = survey_result.survey_id
                WHERE survey_result.user_id = %s AND survey_questions.survey_id = %s
                ORDER BY survey_result.survey_response_date DESC
                LIMIT 1
            """, [user_id, survey_id])
            result = cursor.fetchone()

            cursor.execute("""
                SELECT question
                FROM survey_questions
                WHERE survey_id = %s
            """, [survey_id])
            questions = cursor.fetchall()

            # Create a dictionary to map sequential question IDs to questions
            question_mapping = {str(i + 1): q[0] for i, q in enumerate(questions)}
            print("Answer json is",result[1])
            answer_json = json.loads(result[1])
            print("Answer json is",answer_json)
            answers_with_questions = {question_mapping[q_id]: answer for q_id, answer in answer_json.items()}
        
        if answers_with_questions:
            return answers_with_questions
        else:
            return None
    except Exception as e:
        raise e

def fetch_combined_survey_results(user_id):
    try:
        # Fetch survey IDs attended by the user
        survey_ids = fetch_survey_ids_attended(user_id)

        # Create a dictionary to store combined survey results
        combined_results = {}

        # Fetch and combine survey results for each survey ID
        for survey_id in survey_ids:
            latest_survey_result = fetch_latest_survey_results(user_id, survey_id)
            # combined_results.append(latest_survey_result)
            combined_results.update(latest_survey_result)

        return combined_results
    except Exception as e:
        raise e

def view_all_survey_results(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            user_id = data.get('user_id')

            if user_id is None:
                return JsonResponse({'error': 'Missing user_id'}, status=400)

            combined_results = fetch_combined_survey_results(user_id)

            return JsonResponse({'combined_results': combined_results}, status=200)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    else:
        return JsonResponse({'error': 'Only GET requests are allowed'}, status=405)