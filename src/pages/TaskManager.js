"use client"
import React, { useState } from "react"

export const TaskManager = () => {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState("")

  const addTask = (e) => {
    e.preventDefault()
    if (!newTask.trim()) return
    setTasks([...tasks, { id: Date.now(), title: newTask, completed: false }])
    setNewTask("")
  }

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId))
  }

  const toggleComplete = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    )
  }

  return (
    <div className="task-manager p-4">
      <form onSubmit={addTask} className="mb-4 flex">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md mr-2 focus:outline-none focus:border-blue-500"
          placeholder="Add a new task..."
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
            <span
              className={`flex-1 text-white ${
                task.completed ? "line-through" : ""
              }`}
            >
              {task.title}
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
                onClick={() => deleteTask(task.id)}
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
