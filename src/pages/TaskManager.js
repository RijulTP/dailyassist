import React, { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons"
import SpinnerComponent from "@/components/SpinnerComponent"
import { useSelector } from "react-redux"

const HOST_LOCAL = "http://localhost:8000"
const HOST_PROD = "https://dailyassist-backend.vercel.app"

const Timer = () => {
  const [targetTime, setTargetTime] = useState(null)
  const [timeRemaining, setTimeRemaining] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    let interval = null
    if (isActive && targetTime) {
      interval = setInterval(() => {
        const now = new Date().getTime()
        const distance = targetTime - now

        if (distance < 0) {
          clearInterval(interval)
          setIsActive(false)
          setTimeRemaining({ hours: 0, minutes: 0, seconds: 0 })
        } else {
          const hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          )
          const minutes = Math.floor(
            (distance % (1000 * 60 * 60)) / (1000 * 60)
          )
          const seconds = Math.floor((distance % (1000 * 60)) / 1000)
          setTimeRemaining({ hours, minutes, seconds })
        }
      }, 1000)
    } else if (!isActive) {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [isActive, targetTime])

  const handleStart = () => {
    if (!targetTime) return
    setIsActive(true)
  }

  const handleReset = () => {
    setIsActive(false)
    setTargetTime(null)
    setTimeRemaining({ hours: 0, minutes: 0, seconds: 0 })
  }

  const handleTimeChange = (e) => {
    const [hours, minutes] = e.target.value.split(":").map(Number)
    const now = new Date()
    const target = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hours,
      minutes,
      0,
      0
    )
    setTargetTime(target.getTime())
  }

  return (
    <div className="timer flex items-center space-x-2">
      <input
        type="time"
        onChange={handleTimeChange}
        disabled={isActive}
        className="p-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
      />
      {isActive && (
        <span className="text-xs font-semibold">{`${timeRemaining.hours}:${(
          "0" + timeRemaining.minutes
        ).slice(-2)}:${("0" + timeRemaining.seconds).slice(-2)}`}</span>
      )}
      {!isActive && (
        <button
          onClick={handleStart}
          className="px-2 py-1 bg-blue-500 text-white font-bold rounded-md text-xs shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Start
        </button>
      )}
      {isActive && (
        <button
          onClick={handleReset}
          className="px-2 py-1 bg-gray-500 text-white font-bold rounded-md text-xs shadow hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Reset
        </button>
      )}
    </div>
  )
}

const Task = ({ task, toggleComplete, deleteTask }) => {
  return (
    <li
      key={task.id}
      className="flex items-center justify-between py-4 bg-white shadow-md rounded-lg mb-4 p-4"
    >
      <span
        className={`flex-1 ${
          task.task_status === "completed" ? "line-through text-gray-500" : ""
        }`}
      >
        {task.task_name}
      </span>
      <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
        {task.task_status !== "completed" ? <Timer /> : null}
        <button
          onClick={() => toggleComplete(task.task_id, task.task_status)}
          className="w-full sm:w-auto px-4 py-2 bg-green-500 text-white font-bold rounded-md shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          {task.task_status === "completed"
            ? "Mark Incomplete"
            : "Mark Complete"}
        </button>
        <button
          onClick={() => deleteTask(task.task_id)}
          className="w-full sm:w-auto px-4 py-2 bg-red-500 text-white font-bold rounded-md shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Delete
        </button>
      </div>
    </li>
  )
}
export default function TaskManager() {
  const [tasks, setTasks] = useState([])
  const [taskSetId, setTaskSetId] = useState(null)
  const [newTask, setNewTask] = useState("")
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [isToday, setIsToday] = useState(true)

  const [taskSpinner, setTaskSpinner] = useState(false)
  const [taskModifySpinner, setTaskModifySpinner] = useState(false)
  const user_id = useSelector((state) => state.auth.userId)

  useEffect(() => {
    let today = new Date()
    if (selectedDate.toDateString() === today.toDateString()) {
      setIsToday(true)
    } else {
      setIsToday(false)
    }
  }, [selectedDate])
  useEffect(() => {
    fetchTaskSetId(selectedDate)
  }, [selectedDate])

  useEffect(() => {
    if (taskSetId) {
      setTaskSpinner(true)
      fetchTasks(taskSetId, selectedDate)
    }
  }, [taskSetId])

  useEffect(() => {
    if (tasks) {
      setTaskSpinner(false)
    }
  }, [tasks])

  const fetchTaskSetId = async (date) => {
    try {
      const response = await fetch(
        `${HOST_PROD}/dailyassist/get_task_set_id/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            date_of_task: formatDate(date),
            user_id: user_id,
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
        `${HOST_PROD}/dailyassist/retrievetask/${taskSetId}/`,
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
    setTaskModifySpinner(true)
    e.preventDefault()
    if (!newTask.trim()) return

    try {
      const response = await fetch(`${HOST_PROD}/dailyassist/storetask/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date_of_task: formatDate(selectedDate),
          user_id: user_id,
          task_name: newTask,
          task_status: "Pending",
        }),
      })
      if (!response.ok) {
        throw new Error("Failed to add task")
      }
      setNewTask("")
      fetchTaskSetId(selectedDate)
      fetchTasks(taskSetId, selectedDate)
    } catch (error) {
      console.error("Error adding task:", error)
    }
    setTaskModifySpinner(false)
  }

  const deleteTask = async (taskId) => {
    setTaskModifySpinner(true)
    try {
      const response = await fetch(`${HOST_PROD}/dailyassist/deletetask/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          task_id: taskId,
        }),
      })
      if (!response.ok) {
        throw new Error("Failed to delete task")
      }
      fetchTasks(taskSetId, selectedDate)
    } catch (error) {
      console.error("Error deleting task:", error)
    }
    setTaskModifySpinner(false)
  }

  const toggleComplete = async (taskId, currentTaskStatus) => {
    setTaskModifySpinner(true)
    try {
      const newTaskStatus =
        currentTaskStatus === "completed" ? "pending" : "completed"
      const response = await fetch(
        `${HOST_PROD}/dailyassist/update_task_status/`,
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
        `${HOST_PROD}/dailyassist/retrievetask/${taskSetId}/`
      )
      if (!updatedTaskResponse.ok) {
        throw new Error("Failed to fetch updated task data")
      }

      const updatedTaskData = await updatedTaskResponse.json()
      setTasks(updatedTaskData)
    } catch (error) {
      console.error("Error toggling task completion:", error)
    }
    setTaskModifySpinner(false)
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
    let nextDate = new Date(selectedDate)
    let today = new Date()
    if (nextDate.toDateString() === today.toDateString()) {
      // Selected date is today's date, do not advance
      return
    }
    setTasks([])
    nextDate.setDate(nextDate.getDate() + 1)
    setSelectedDate(nextDate)
  }

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
      {taskSetId || isToday ? (
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
          {taskSpinner ? (
            <SpinnerComponent />
          ) : (
            <ul>
              {tasks.map((task) => (
                <Task
                  key={task.id}
                  task={task}
                  toggleComplete={toggleComplete}
                  deleteTask={deleteTask}
                />
              ))}
            </ul>
          )}

          {taskModifySpinner ? (
            <SpinnerComponent />
          ) : (
            null
          )}
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
