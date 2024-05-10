import React, { useState, useEffect } from "react"
import Link from "next/link"

const HOST_LOCAL = "http://localhost:8000"
const HOST_PROD = "https://dailyassist-backend.vercel.app"

const SurveyStart = () => {
  const [surveys, setSurveys] = useState([])

  useEffect(() => {
    fetch(`${HOST_PROD}/dailyassist/view_survey_list/`)
      .then((response) => response.json())
      .then((data) => {
        setSurveys(data.surveys)
      })
      .catch((error) => console.error("Error fetching survey list:", error))
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Welcome to Surveys
        </h1>
        <p className="text-lg text-gray-600 mb-8 text-center">
          Please take a moment to complete the following surveys to help us
          understand your productivity, well-being, and work-life balance.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {surveys.map((survey) => (
            <div
              key={survey.survey_id}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h2 className="text-xl font-bold mb-4">{survey.survey_name}</h2>
              <p className="text-gray-700 mb-4">{survey.survey_description}</p>
              <Link
                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-300 ease-in-out"
                href={{
                  pathname: "/SurveyPage",
                  query: {
                    survey_id: survey.survey_id,
                  }, // Pass survey_id as a query parameter
                }}
              >
                Start Survey
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SurveyStart
