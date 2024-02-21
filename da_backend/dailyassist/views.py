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



def viewlibrary(request):
    try:
        print("Executing main query")
        query = f"""
        SELECT *
        FROM Book
        """
        with connection.cursor() as cursor:
            cursor.execute(query)
            results = cursor.fetchall()
            print("The results are",results)
            result_list = []
            for row in results:
                result_dict = {
                    'book_id': row[0],
                    'title': row[1],
                    'author': row[2],
                    'price': row[3],
                    'publisher_id': row[4]
                }
                result_list.append(result_dict)

            # Convert the list of dictionaries to a JSON string
            

    except Exception as e:
        return HttpResponse(f"An error occurred: {str(e)}", status=500)
    json_result = json.dumps(result_list)
    return HttpResponse(json_result, content_type="application/json")


def viewpublishers(request):
    try:
        print("Executing main query")
        query = f"""
        SELECT *
        FROM publisher
        """
        with connection.cursor() as cursor:
            cursor.execute(query)
            results = cursor.fetchall()
            print("The results are",results)
            result_list = []
            for row in results:
                result_dict = {
                    'publisher_id': row[0],
                    'publisher_name': row[1],
                    'address': row[2],
                }
                result_list.append(result_dict)

            # Convert the list of dictionaries to a JSON string
            

    except Exception as e:
        return HttpResponse(f"An error occurred: {str(e)}", status=500)
    json_result = json.dumps(result_list)
    return HttpResponse(json_result, content_type="application/json")


def addbooks(request):
    if request.method == "POST":
        try:
            result = json.loads(request.body)
            print("The result is",result)
            for bookKey in result:
                title = result[bookKey]["book_name"]
                author = result[bookKey]["author_name"]
                price = result[bookKey]["price"]
                P_ID = result[bookKey]["publisher"]["value"]
                query = f"""
                    INSERT INTO Book (title, author, price, P_ID)
                    VALUES('{title}', '{author}', '{price}', '{P_ID}');
                """
                with connection.cursor() as cursor:
                    cursor.execute(query)
            return HttpResponse("Add New Staff API")
        except Exception as e:
            return HttpResponse(f"Error: {str(e)}", status=500)
        

def deletebook(request):
    if request.method == "POST":
        try:
            result = json.loads(request.body)
            print("The result is",result)
            book_id = result["book_id"]
            query = f"""
                DELETE from Book WHERE book_id={book_id};
            """
            with connection.cursor() as cursor:
                cursor.execute(query)
            return HttpResponse("Deleted Book")
        except Exception as e:
            return HttpResponse(f"Error: {str(e)}", status=500)
        


def updatebook(request):
    if request.method == "POST":
        try:
            result = json.loads(request.body)
            print("The result is",result)
            book_id = result["book_id"]
            title = result["title"]
            author = result["author"]
            price = result["price"]
            query = f"""
                UPDATE Book set title='{title}', author='{author}', price='{price}' where book_id={book_id}
            """
            with connection.cursor() as cursor:
                cursor.execute(query)
            return HttpResponse("Updated book details")
        except Exception as e:
            return HttpResponse(f"Error: {str(e)}", status=500)
        

def submitBorrow(request):
    if request.method == "POST":
        try:
            result = json.loads(request.body)
            book_id = result['book_id']
            member_id = result['member_id']
            
            # Set issue_date to today's date
            issue_date = datetime.now().strftime('%Y-%m-%d')
            
            # Set due_date to one month from now
            due_date = (datetime.now() + timedelta(days=30)).strftime('%Y-%m-%d')
            
            staff_id = 1

            query = f"""
                INSERT INTO borrow (book_id, member_id, issue_date, due_date, staff_id)
                VALUES ({book_id}, {member_id}, '{issue_date}', '{due_date}', {staff_id})
            """
            with connection.cursor() as cursor:
                cursor.execute(query)
                
            return HttpResponse("Updated borrow details")
        except Exception as e:
            return HttpResponse(f"Error: {str(e)}", status=500)

def getBookName(book_id):
    try:
        print("Executing main query")
        query = f"""
        SELECT title from Book where book_id={book_id}
        """
        with connection.cursor() as cursor:
            cursor.execute(query)
            results = cursor.fetchall()
            print("the book name is",results)
        return results[0]


    except Exception as e:
        return HttpResponse(f"An error occurred: {str(e)}", status=500)


def getMemberName(member_id):
    try:
        print("Executing main query")
        query = f"""
        SELECT name from member where member_id={member_id}
        """
        with connection.cursor() as cursor:
            cursor.execute(query)
            results = cursor.fetchall()
            print("The member name is",results)
        return results[0]

    except Exception as e:
        return HttpResponse(f"An error occurred: {str(e)}", status=500)



def viewborrow(request):
    try:
        print("Executing main query")
        query = f"""
        SELECT *
        FROM borrow
        """
        with connection.cursor() as cursor:
            cursor.execute(query)
            results = cursor.fetchall()
            
            result_list = []
            for row in results:
                result_dict = {
                    'borrow_id': row[0],
                    'book_id': row[1],
                    'member_id': row[2],
                    'issue_date': str(row[3]),
                    'due_date': str(row[4]),
                    'return_date':str(row[5])
                }
                result_list.append(result_dict)

            processed_list = []
            for unit in result_list:
                book_name = getBookName(unit["book_id"])
                member_name = getMemberName(unit["member_id"])
                
                processed_dict = {
                    'borrow_id':unit['borrow_id'],
                    'title':book_name,
                    'member_id':unit["member_id"],
                    'member_name': member_name,
                    'issue_date': unit["issue_date"],
                    'due_date': unit["due_date"],
                    'return_date': unit["return_date"]
                }
                processed_list.append(processed_dict)
                print("The processed dict are",processed_dict)

    except Exception as e:
        return HttpResponse(f"An error occurred: {str(e)}", status=500)
    json_result = json.dumps(processed_list)
    return HttpResponse(json_result, content_type="application/json")


def returnbook(request):
    if request.method == "POST":
        try:
            result = json.loads(request.body)
            print("The result is",result)
            borrow_id = result['borrow_id']
            return_date = datetime.now().strftime('%Y-%m-%d')
            return_date = str(return_date)
            query = f"""
                UPDATE borrow set return_date='{return_date}'
                where borrow_id={borrow_id}
            """
            with connection.cursor() as cursor:
                cursor.execute(query)
            return HttpResponse("Marked the borrow as returned")
        except Exception as e:
            return HttpResponse(f"Error: {str(e)}", status=500)
        
def login(request):
    if request.method == "POST":
        try:
            result = json.loads(request.body)
            user_id = result['user_id']
            password = result['password']
            query = f"SELECT * FROM staff WHERE staff_uid = '{user_id}'"
            
            with connection.cursor() as cursor:
                cursor.execute(query)
                user_data = cursor.fetchone()
                print("User data is",user_data)

            if user_data is not None:
                stored_password = user_data[3]
                if password == stored_password:
                    return HttpResponse("Login successful")
                else:
                    return HttpResponse(f"Invalid Password", status=401)
            else:
                return HttpResponse("User not found", status=404)

        except Exception as e:
            return HttpResponse(f"Error: {str(e)}", status=500)

def memberview(request):
    try:
        print("Executing main query")
        query = f"""
        SELECT *
        FROM member
        """
        with connection.cursor() as cursor:
            cursor.execute(query)
            results = cursor.fetchall()
            
            result_list = []
            for row in results:
                result_dict = {
                    'member_id': row[0],
                    'name': row[1],
                    'address': row[2],
                    'Memb_date': str(row[3]),
                    'Exp_date':str(row[4])
                }
                result_list.append(result_dict)

    except Exception as e:
        return HttpResponse(f"An error occurred: {str(e)}", status=500)
    json_result = json.dumps(result_list)
    return HttpResponse(json_result, content_type="application/json")


def addmembers(request):
    if request.method == "POST":
        try:
            result = json.loads(request.body)
            print("The result is",result)
            for bookKey in result:
                memb_name = result[bookKey]["member_name"]
                memb_address = result[bookKey]["member_address"]
                memb_date = datetime.now().strftime('%Y-%m-%d')
                exp_date = (datetime.now() + timedelta(days=365)).strftime('%Y-%m-%d')

                query = f"""
                    INSERT INTO member(name, address, Memb_date, Exp_date) VALUES('{memb_name}', '{memb_address}', '{memb_date}', '{exp_date}');
                """

                print("The query is",query)
                with connection.cursor() as cursor:
                    cursor.execute(query)
            return HttpResponse("Add New Staff API")
        except Exception as e:
            return HttpResponse(f"Error: {str(e)}", status=500)