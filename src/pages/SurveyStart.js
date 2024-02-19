import React from "react"
import Link from "next/link"

const SurveyStart = () => {
  const surveys = [
    {
      id: 1,
      title: "Productivity Survey",
      description: "Measure your current productivity levels.",
    },
    {
      id: 2,
      title: "Well-being Survey",
      description: "Assess your overall well-being and happiness.",
    },
    {
      id: 3,
      title: "Work-Life Balance",
      description: "Evaluate your work-life balance.",
    },
    // Add more surveys as needed
  ]

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
            <div key={survey.id} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">{survey.title}</h2>
              <p className="text-gray-700 mb-4">{survey.description}</p>
              <Link
                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-300 ease-in-out"
                href={{
                  pathname: "/SurveyPage",
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
