import React from "react"
import Link from "next/link"

const SurveySubmittedPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-center mb-4">
          Survey Submitted!
        </h1>
        <p className="text-lg text-gray-700 text-center mb-6">
          Thank you for participating in the survey, Check back on the Analysis
          soon!
        </p>
        <img
          src="/checkmark.png" // Add your checkmark image path
          alt="Checkmark Icon"
          className="w-20 mx-auto mb-6"
        />
        <Link
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          href={{
            pathname: "/DAHomePage",
          }}
        >
          Go back home
        </Link>
      </div>
    </div>
  )
}

export default SurveySubmittedPage
