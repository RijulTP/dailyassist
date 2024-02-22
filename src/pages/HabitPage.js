import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faClock } from "@fortawesome/free-solid-svg-icons"

const challenges = {
  1: "Make your bed",
  2: "Clean your wardrobe",
  // Add more challenges here for each day
}

const HabitPage = () => {
  const [selectedDay, setSelectedDay] = useState(null)
  const [currentDay, setCurrentDay] = useState(1)
  const [completedDays, setCompletedDays] = useState([])

  const handleBoxClick = (index) => {
    if (index < currentDay - 1) {
      setSelectedDay(index)
    } else if (index === currentDay - 1) {
      setSelectedDay(index)
    }
  }

  const markAsComplete = () => {
    setCompletedDays([...completedDays, currentDay])
    setCurrentDay((prevDay) => prevDay + 1)
  }

  const isDayCompleted = (index) => {
    return completedDays.includes(index + 1)
  }

  return (
    <div className="container mx-auto mt-8 px-4">
      <h1 className="text-3xl font-semibold mb-4">My Habit Tracker</h1>
      <p className="mb-4">Habit: Keep Your Surroundings Clean</p>
      <p className="mb-4">
        Instructions: Click on each day to reveal the challenge. Complete the
        challenge for the current day before advancing to the next day.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {Array.from({ length: 21 }, (_, index) => (
          <div
            key={index}
            className={`p-4 border rounded cursor-pointer relative ${
              selectedDay === index && index < currentDay - 1
                ? "bg-blue-200"
                : selectedDay === index && index === currentDay - 1
                ? "bg-green-200"
                : isDayCompleted(index)
                ? "bg-green-200"
                : "bg-gray-200"
            }`}
            onClick={() => handleBoxClick(index)}
          >
            <div className="flex justify-between">
              <span>{index + 1}</span>
              {selectedDay === index && !isDayCompleted(index) && (
                <FontAwesomeIcon icon={faClock} className="text-green-500" />
              )}
              {isDayCompleted(index) && (
                <FontAwesomeIcon icon={faCheck} className="text-green-500" />
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8">
        {selectedDay !== null && (
          <div className="bg-white shadow-md rounded-md p-4">
            <h2 className="text-lg font-semibold mb-2">
              Challenge for Day {selectedDay + 1}
            </h2>
            <p>{challenges[selectedDay + 1]}</p>
          </div>
        )}
      </div>
      {
        <div className="mt-4">
          <button
            className={`py-2 text-white px-4 rounded ${
              isDayCompleted(selectedDay)
                ? "bg-green-700"
                : "bg-green-500 hover:bg-green-600"
            }`}
            onClick={markAsComplete}
            disabled={isDayCompleted(selectedDay)}
          >
            {isDayCompleted(selectedDay)
              ? "Challenge Completed"
              : "Mark as Complete"}
          </button>
        </div>
      }
    </div>
  )
}

export default HabitPage
