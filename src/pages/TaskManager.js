import React, { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
const USER_ID = 1

export default function TaskManager() {
  const [tasks, setTasks] = useState([])
  const [taskSetId, setTaskSetId] = useState(null)
  const [newTask, setNewTask] = useState("")
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [isToday, setIsToday] = useState(true)
  useEffect(()=>{
    let today = new Date();
    if (selectedDate.toDateString() === today.toDateString()) {
      setIsToday(true)
    }
    else{
      setIsToday(false)
    }
  },[selectedDate])
  useEffect(() => {
    fetchTaskSetId(selectedDate)
  }, [selectedDate])

  useEffect(() => {
    if (taskSetId) {
      fetchTasks(taskSetId, selectedDate)
    }
  }, [taskSetId])

  const fetchTaskSetId = async (date) => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/dailyassist/get_task_set_id/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            date_of_task: formatDate(date),
            user_id: USER_ID,
          }),
        }
      )
      if (!response.ok) {
        throw new Error("Failed to fetch task set ID")
      }
      const data = await response.json()
      setTaskSetId(data.task_set_id)
    } catch (error) {
      console.error("Error fetching task set ID:", error)
    }
  }

  const fetchTasks = async (taskSetId, date) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/dailyassist/retrievetask/${taskSetId}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            date_of_task: formatDate(date),
          }),
        }
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
            date_of_task: formatDate(selectedDate),
            user_id: USER_ID,
            task_name: newTask,
            task_status: "Pending",
          }),
        }
      )
      if (!response.ok) {
        throw new Error("Failed to add task")
      }
      setNewTask("")
      fetchTaskSetId(selectedDate)
      fetchTasks(taskSetId, selectedDate)
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
      fetchTasks(taskSetId, selectedDate)
    } catch (error) {
      console.error("Error deleting task:", error)
    }
  }

  const toggleComplete = async (taskId, currentTaskStatus) => {
    try {
      const newTaskStatus =
        currentTaskStatus === "completed" ? "pending" : "completed"
      const response = await fetch(
        "http://127.0.0.1:8000/dailyassist/update_task_status/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            task_id: taskId,
            task_status: newTaskStatus,
          }),
        }
      )

      if (!response.ok) {
        throw new Error("Failed to toggle task completion")
      }

      const updatedTaskResponse = await fetch(
        `http://127.0.0.1:8000/dailyassist/retrievetask/${taskSetId}/`
      )
      if (!updatedTaskResponse.ok) {
        throw new Error("Failed to fetch updated task data")
      }

      const updatedTaskData = await updatedTaskResponse.json()
      setTasks(updatedTaskData)
    } catch (error) {
      console.error("Error toggling task completion:", error)
    }
  }

  const formatDate = (date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    return `${year}-${month}-${day}`
  }

  const handlePrevDate = () => {
    let prevDate = new Date(selectedDate)
    prevDate.setDate(prevDate.getDate() - 1)
    setSelectedDate(prevDate)
  }

  const handleNextDate = () => {
    let nextDate = new Date(selectedDate);
    let today = new Date();
    if (nextDate.toDateString() === today.toDateString()) {
      // Selected date is today's date, do not advance
      return;
    }
    nextDate.setDate(nextDate.getDate() + 1);
    setSelectedDate(nextDate);
  };
  

  const completedTasksCount = tasks.filter(
    (task) => task.task_status === "completed"
  ).length
  const totalTasksCount = tasks.length
  const progressPercentage =
    totalTasksCount === 0
      ? 0
      : ((completedTasksCount / totalTasksCount) * 100).toFixed(2)

  return (
    <div className="task-manager p-4">
      <div className="relative mb-10">
        <div className="flex flex-col text-center justify-center">
          <span className="p-1 text-center font-bold">Tasks done</span>
        </div>
        <div className="flex-1 bg-gray-200 h-6 rounded-full relative overflow-hidden">
          <div
            className="bg-blue-500 h-6 rounded-full absolute top-0 left-0 transition-all duration-500 ease-in-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
          <p className="absolute top-0 right-0 mr-2 text-sm text-gray-600">
            {`${progressPercentage}%`}
          </p>
        </div>
      </div>
      <div className="flex justify-center items-center mb-4 ">
        <button
          onClick={handlePrevDate}
          className="mr-2 px-3 py-1 rounded-md font-bold text-gray-500 hover:text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
        >
          {"<"}
        </button>
        <label htmlFor="datePicker" className="mr-2 font-bold">
          Select Date:
        </label>
        <span className="bg-blue-100 px-2 py-1 rounded-md text-blue-700 font-bold">
          {formatDate(selectedDate)}
        </span>
        <button
          onClick={handleNextDate}
          className="ml-2 px-3 py-1  font-boldrounded-md text-gray-500 hover:text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
        >
          {">"}
        </button>
      </div>
      {(taskSetId || isToday) ? (
        <>
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
              <li
                key={task.id}
                className="flex items-center justify-between py-2"
              >
                <span
                  className={`flex-1 ${
                    task.task_status === "completed" ? "line-through" : ""
                  }`}
                >
                  {task.task_name}
                </span>
                <div>
                  <button
                    onClick={() =>
                      toggleComplete(task.task_id, task.task_status)
                    }
                    className={`mr-2 px-4 py-2 bg-green-500 text-white font-bold rounded-md`}
                  >
                    {task.task_status === "completed"
                      ? "Mark Incomplete"
                      : "Mark Complete"}
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
        </>
      ) : (
        <div className="text-center text-2xl text-gray-500 py-12">
          <FontAwesomeIcon
            icon={faExclamationCircle}
            className="text-red-500 mr-2"
          />
          No tasks done this day
        </div>
      )}
    </div>
  )
}
