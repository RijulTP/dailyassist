import React from "react"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faBed,
  faBook,
  faBookOpenReader,
  faCoffee,
  faDumbbell,
  faGlassCheers,
  faGlassWater,
  faM,
  faPlus,
  faSun,
  faWater,
} from "@fortawesome/free-solid-svg-icons"

const HabitBuildingPage = () => {
  // Define your list of habits with their respective icons
  const habits = [
    { name: "Exercise", icon: faDumbbell },
    { name: "Reading", icon: faBookOpenReader },
    { name: "Meditate", icon: faM },
    { name: "Drink Water", icon: faGlassWater },
    { name: "Journal", icon: faBook },
    { name: "Night Routine", icon: faBed },
    { name: "Positive Affirmations", icon: faPlus },
    { name: "Morning Routine", icon: faSun },
    // Add more habits as needed
  ]

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-8">
      <h1 className="text-3xl font-bold mb-8">Habit Building Page</h1>
      <p className="text-lg text-center text-gray-800 font-medium py-4 px-6 bg-gray-100 rounded-lg shadow-md mb-8">
        This is a page to select, track, and reinforce your habits. Choose your
        habits and use the page to stay consistent. It's a tool for cultivating
        lasting behavior change and personal growth.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {habits.map((habit, index) => (
          <Link
            href={{ pathname: "/HabitPage", query: { habit_id: index + 1 } }}
            key={index}
            className="transition duration-300 ease-in-out transform hover:scale-110"
          >
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center hover:bg-green-200">
              <FontAwesomeIcon icon={habit.icon} size="3x" className="mb-4" />
              <p className="text-lg font-bold">{habit.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default HabitBuildingPage
