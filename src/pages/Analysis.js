import React, { useState, useEffect } from "react"
import { GoogleGenerativeAI } from "@google/generative-ai"

const API_KEY = "AIzaSyBmrOh1cZRZIEtznQSsUTqY13isfsfXCCA"
const genAI = new GoogleGenerativeAI(API_KEY)
const model = genAI.getGenerativeModel({ model: "gemini-pro" })

const moodPrompt =
  "I need you to evaluate the users mood and mindset from the following survey question and answers. Write one line in 2nd person on how the user feels right now"

const advicePrompt =
  "I need you to give an advice, based on the data below, You need to give advice in 2nd person on how to lead a better life based on the data below"

const DailyAnalysisPage = () => {
  const [habitData, setHabitData] = useState([])
  const [userMood, setUserMood] = useState("")
  const [advice, setAdvice] = useState("")
  const [isLoading, setIsLoading] = useState(true)

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
      let result = await model.generateContent(
        moodPrompt + JSON.stringify(data.combined_results)
      )
      let text = await result.response.text()
      setUserMood(text)
    } catch (error) {
      console.error("Error fetching survey results:", error)
    }
  }

  useEffect(() => {
    // Fetch habit data and survey results on component mount
    fetchHabitData()
    fetchSurveyResults()
    setIsLoading(false)
  }, []) // Empty dependency array ensures the effect runs only once on mount

  // Sample word of advice based on mood (can be further customized)
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
        <p className="text-sm text-gray-600">{advice}</p>
      </div>
    </div>
  )
}

export default DailyAnalysisPage
