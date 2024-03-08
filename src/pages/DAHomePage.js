/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/link-passhref */
"use client"
// Import necessary modules
import React, { useState, useEffect } from "react"
import MotivationalQuote from "./MotivationalQuote"
import Chatbot from "../components/Chatbot"
import TaskManager from "./TaskManager"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faPoll,
  faMagnifyingGlass,
  faPersonWalking,
  faRobot,
} from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"
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
              Welcome to Life Navigator!
            </p>
            <MotivationalQuote />
          </div>
          {/* Rest of the stuff */}
          <TaskManager />

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            <Link
              className="w-25 flex items-center justify-center p-4 rounded-md border border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              href={{
                pathname: "/SurveyStart",
              }}
            >
              <FontAwesomeIcon icon={faPoll} class="w-10 mr-2" />
              <span>Survey</span>
            </Link>
            <Link
              className="flex items-center justify-center p-4 rounded-md border border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              href={{
                pathname: "/Analysis",
              }}
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} class="w-10 mr-2" />
              <span>Your Analysis</span>
            </Link>
            <Link
              className="flex items-center justify-center p-4 rounded-md border border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              href={{
                pathname: "/HabitBuilder",
              }}
            >
              <FontAwesomeIcon icon={faPersonWalking} class="w-10 mr-2" />
              <span>Habit Builder</span>
            </Link>
            <Link
              className="flex items-center justify-center p-4 rounded-md border border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              href={{
                pathname: "/DailyAssistBot",
              }}
            >
              <FontAwesomeIcon icon={faRobot} class="w-10 mr-2" />
              <span>Life Navigator Bot</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
// Export the component
export default DAHomePage
