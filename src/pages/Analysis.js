import React, { useState, useEffect } from "react"
import { GoogleGenerativeAI } from "@google/generative-ai"
import ReactMarkdown from "react-markdown"

const USER_ID = 1
const API_KEY = "AIzaSyBmrOh1cZRZIEtznQSsUTqY13isfsfXCCA"
const genAI = new GoogleGenerativeAI(API_KEY)
const model = genAI.getGenerativeModel({ model: "gemini-pro" })

const moodPrompt =
  "I need you to evaluate the users mood and mindset from the following survey question and answers. Write one line in 2nd person on how the user feels right now"

const advicePrompt =
  "I need you to give a personalized advice, highlighting the specific data below, You need to give advice in 2nd person based on the habits, tasks of the user"

const DailyAnalysisPage = () => {
  const [habitData, setHabitData] = useState([])
  const [humanizedHabitData, setHumanizedHabitData] = useState("")
  const [humanizedTaskData, setHumanizedTaskData] = useState("")
  const [userMood, setUserMood] = useState(null)
  const [userAdvice, setUserAdvice] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [tasks, setTasks] = useState([])
  const [taskSetId, setTaskSetId] = useState(null)
  const [surveyResults, setSurveyResults] = useState(null)

  useEffect(() => {
    if (taskSetId) {
      fetchTasks(taskSetId) // Fetches tasks after the task is set
    }
  }, [taskSetId])

  useEffect(() => {
    if (surveyResults) {
      fetchUserMood() // Fetches tasks after the task is set
    }
  }, [surveyResults])

  useEffect(() => {
    if (userMood) {
      fetchUserAdvice() // Fetches tasks after the task is set
    }
  }, [userMood])

  function humanizeHabitData(data) {
    let sentences = ""
    for (const habit of data) {
      const sentence = `${habit.name}: ${habit.percentage.toFixed(2)}%`
      console.log("The sentence is", sentence)
      sentences = sentences + sentence
    }
    return sentences
  }

  function humanizeTaskData(data) {
    let sentences = []
    for (const task of data) {
      const status = task.task_status
      const sentence = `${task.task_name}: ${status}`
      sentences.push(sentence)
    }
    return sentences.join(", ")
  }

  const getCurrentDate = () => {
    const currentDate = new Date()
    const year = currentDate.getFullYear()
    const month = String(currentDate.getMonth() + 1).padStart(2, "0")
    const day = String(currentDate.getDate()).padStart(2, "0")
    return `${year}-${month}-${day}`
  }

  const fetchTaskSetId = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/dailyassist/get_task_set_id/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            date_of_task: getCurrentDate(), // Dynamically fetch today's date
            user_id: USER_ID, // Hardcoded user ID
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

  const fetchTasks = async (taskSetId) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/dailyassist/retrievetask/${taskSetId}/`
      )
      if (!response.ok) {
        throw new Error("Failed to fetch tasks")
      }
      const data = await response.json()
      setHumanizedTaskData(humanizeTaskData(data))
      setTasks(data)
    } catch (error) {
      console.error("Error fetching tasks:", error)
    }
  }

  // Function to fetch habit percentages
  const fetchHabitData = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/dailyassist/view_habit_percentages/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: 1 }), // Adjust user_id as needed
        }
      )
      const data = await response.json()
      const humanizedHabitData = humanizeHabitData(data.habits)
      setHumanizedHabitData(humanizedHabitData)
      setHabitData(data.habits)
    } catch (error) {
      console.error("Error fetching habit data:", error)
    }
  }

  // Function to fetch survey results
  const fetchSurveyResults = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/dailyassist/view_all_survey_results/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: 1 }), // Adjust user_id as needed
        }
      )
      const data = await response.json()
      setSurveyResults(JSON.stringify(data.combined_results))
    } catch (error) {
      console.error("Error fetching survey results:", error)
    }
  }

  const fetchUserMood = async () => {
    let result = await model.generateContent(moodPrompt + surveyResults)
    let text = await result.response.text()
    setUserMood(text)
  }

  const fetchUserAdvice = async () => {
    let userAdvicePrompt = `${advicePrompt}.
    Details of the tasks the person did is: ${humanizedTaskData}
    Percentage of Habit building done is: ${humanizedHabitData}`

    console.log("The user advice prompt is", userAdvicePrompt)
    let result = await model.generateContent(userAdvicePrompt)
    let text = await result.response.text()
    setUserAdvice(text)
  }

  useEffect(() => {
    fetchTaskSetId()
    fetchHabitData()
    fetchSurveyResults()
    setIsLoading(false)
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Daily Analysis Page</h1>
      <p className="text-lg mb-4">
        This page provides insights into your daily productivity and well-being
        based on tasks completed and surveys done.
      </p>
      {/* Progress Bar */}
      <div className="mb-6 w-full max-w-md">
        <div className="flex items-center mb-2">
          <div className="w-10 mr-4">
            <p className="text-sm text-gray-600">Tasks Done:</p>
          </div>
          <div className="flex-1 bg-gray-200 h-6 rounded-full relative overflow-hidden">
            <div
              className="bg-blue-500 h-6 rounded-full absolute top-0 left-0 transition-all duration-500 ease-in-out"
              style={{ width: "75%" }} // Set width dynamically based on progress percentage
            ></div>
            <p className="absolute top-0 right-0 mr-2 text-sm text-gray-600">
              75%
            </p>
          </div>
        </div>
      </div>
      {/* Habit Summary */}
      <div className="mb-6">
        <p className="text-sm text-gray-600 mb-2">Habit Summary:</p>
        <div className="flex flex-wrap justify-center">
          {habitData.map((habit, index) => (
            <div>
              <div
                key={index}
                className="flex items-center justify-center w-24 h-24 bg-blue-200 rounded-full mr-4 mb-4"
              >
                <p className="font-semibold text-blue-800 text-lg">
                  {habit.percentage}%
                </p>
              </div>

              <p className="flex items-center justify-center font-semibold w-24 mr-4 mb-4 font">
                {habit.name}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* Current User Mood */}
      <div className="bg-gray-200 p-4 rounded-lg mb-4 w-full max-w-md">
        <p className="text-sm text-gray-600">
          Current Mood:{" "}
          <span className="font-semibold text-blue-800">{userMood}</span>
        </p>
      </div>
      {/* Word of Advice */}
      <div className="bg-gray-200 p-4 rounded-lg w-full max-w-md">
        <p className="text-sm text-gray-600">
          <ReactMarkdown className="message-text">{userAdvice}</ReactMarkdown>
        </p>
      </div>
    </div>
  )
}

export default DailyAnalysisPage
