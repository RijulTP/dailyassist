import React, { useState, useEffect } from "react"

export default function TaskManager() {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState("")

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      let task_set_id = 1
      const response = await fetch(
        `http://127.0.0.1:8000/dailyassist/retrievetask/${task_set_id}/`
      )
      if (!response.ok) {
        throw new Error("Failed to fetch tasks")
      }
      const data = await response.json()
      setTasks(data)
    } catch (error) {
      console.error("Error fetching tasks:", error)
    }
  }

  const addTask = async (e) => {
    e.preventDefault()
    if (!newTask.trim()) return

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/dailyassist/storetask/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            date_of_task: "2024-02-22", // Hardcoded date of task
            user_id: 1, // Hardcoded user ID
            task_name: newTask,
            task_status: "Pending", // Hardcoded task status
          }),
        }
      )
      if (!response.ok) {
        throw new Error("Failed to add task")
      }
      setNewTask("")
      fetchTasks() // Refresh tasks after adding a new task
    } catch (error) {
      console.error("Error adding task:", error)
    }
  }

  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/dailyassist/deletetask/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            task_id: taskId,
          }),
        }
      )
      if (!response.ok) {
        throw new Error("Failed to delete task")
      }
      fetchTasks() // Refresh tasks after deleting a task
    } catch (error) {
      console.error("Error deleting task:", error)
    }
  }

  const toggleComplete = async (taskId) => {
    try {
      // Implement toggle complete functionality if needed
    } catch (error) {
      console.error("Error toggling task completion:", error)
    }
  }

  return (
    <div className="task-manager p-4">
      <form onSubmit={addTask} className="mb-4 flex">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md mr-2 focus:outline-none focus:border-blue-500"
          placeholder="Task Name"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Add Task
        </button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="flex items-center justify-between py-2">
            <span className={`flex-1  ${task.completed ? "line-through" : ""}`}>
              {task.task_name}
            </span>
            <div>
              <button
                onClick={() => toggleComplete(task.id)}
                className={`mr-2 px-4 py-2 bg-green-500 text-white font-bold rounded-md ${
                  task.completed
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:text-green-600 focus:outline-none"
                }`}
                disabled={task.completed}
              >
                {task.completed ? "Mark Incomplete" : "Mark Complete"}
              </button>
              <button
                onClick={() => deleteTask(task.task_id)}
                className="bg-red-500 px-4 py-2 text-white font-bold hover:text-red-600 focus:outline-none rounded-md"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
