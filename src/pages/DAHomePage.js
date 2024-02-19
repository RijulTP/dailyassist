/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/link-passhref */
"use client"
// Import necessary modules
import React, { useState, useEffect } from "react"
import MotivationalQuote from "./MotivationalQuote"
import Chatbot from "./Chatbot"
import { TaskManager } from "./TaskManager"

const DAHomePage = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false)
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false)

  useEffect(() => {
    // Delay showing the welcome message to simulate animation
    const timeout = setTimeout(() => {
      setShowWelcomeMessage(true)
    }, 300) // Adjust delay as needed

    return () => clearTimeout(timeout)
  }, [])

  return (
    <div className="min-h-screen flex w-full">
      <div className="min-h-screen flex items-center justify-center bg-white-100 w-full">
        <div className="w-full max-w-3xl p-6 rounded-lg">
          {/* Welcome Message */}
          <div
            className={`mb-8 ${
              showWelcomeMessage
                ? "opacity-100 transition-all duration-500 ease-in-out"
                : "opacity-0"
            }`}
          >
            <p className="text-center text-2xl font-bold mb-4">
              Welcome to Daily Assist!
            </p>
            <MotivationalQuote />
          </div>
          {/* Rest of the stuff */}
          <TaskManager />
          <div className="fixed bottom-8 right-8">
            <button
              onClick={() => setIsChatbotOpen(!isChatbotOpen)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none"
            >
              Chat
            </button>
          </div>
          {isChatbotOpen && <Chatbot />}
        </div>
      </div>
    </div>
  )
}
// Export the component
export default DAHomePage
