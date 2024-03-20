import React, { useState } from "react"

const DailyWeeklyAnalysisPage = () => {
  const [showWeeklyAnalysis, setShowWeeklyAnalysis] = useState(false)
  const [showDailyAnalysis, setShowDailyAnalysis] = useState(false)

  const weeklyAnalysisContent = (
    <div className="bg-blue-200 p-6 rounded shadow mb-4">
      <h2 className="text-xl font-bold mb-4">Weekly Analysis</h2>
      {/* Include your weekly analysis content here */}
    </div>
  )

  const dailyAnalysisContent = (
    <div className="bg-green-200 p-6 rounded shadow mb-4">
      <h2 className="text-xl font-bold mb-4">Daily Analysis</h2>
      {/* Include your daily analysis content here */}
    </div>
  )

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Daily/Weekly Analysis Page</h1>
      <div className="max-w-md mx-auto p-6 rounded-lg shadow-lg">
        <p className="text-lg mb-4">
          This page provides insights into your daily and weekly productivity
          and well-being based on tasks completed and surveys done.
        </p>
        <div className="mb-4">
          <button
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none hover:bg-blue-600 mr-4"
            onClick={() => setShowWeeklyAnalysis(!showWeeklyAnalysis)}
          >
            {showWeeklyAnalysis
              ? "Hide Weekly Analysis"
              : "View Weekly Analysis"}
          </button>
          <button
            className="bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none hover:bg-green-600"
            onClick={() => setShowDailyAnalysis(!showDailyAnalysis)}
          >
            {showDailyAnalysis ? "Hide Daily Analysis" : "View Daily Analysis"}
          </button>
        </div>
      </div>
      {showWeeklyAnalysis && weeklyAnalysisContent}
      {showDailyAnalysis && dailyAnalysisContent}
    </div>
  )
}

export default DailyWeeklyAnalysisPage
