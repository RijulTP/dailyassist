import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

const DIAMETER_NUM1 = 50
const DIAMETER_NUM2 = 5.5

const TXTSIZE_NUM1 = 20
const TXTSIZE_NUM2 = 2
const DEFAULT_NUM = 5

const NO_POINTS = 0

export default function Rating({
  choiceNo,
  surveyQid,
  qType,
  surveyId,
  qNum,
  points,
  onAnswer // Add onAnswer prop
}) {
  const dispatch = useDispatch()
  const [selectedOption, setOption] = useState(null)
  const [ratingOps, setRatingOps] = useState([])
  const [diameter, setDiameter] = useState(0)
  const [txtSize, setTxtSize] = useState(0)

  useEffect(() => {
    const newRatingOps = Array.from(
      { length: choiceNo },
      (_, index) => index + 1
    )
    console.log("New rating ops are", newRatingOps)
    setRatingOps(newRatingOps)

    const newDiameter = DIAMETER_NUM1 - DIAMETER_NUM2 * (choiceNo - DEFAULT_NUM)
    const newTxtSize = TXTSIZE_NUM1 - TXTSIZE_NUM2 * (choiceNo - DEFAULT_NUM)
    setDiameter(newDiameter)
    setTxtSize(newTxtSize)
  }, [choiceNo])

  function optionSelect(newlySelected) {
    console.log("Option select", newlySelected)
    setOption(newlySelected)
    if (onAnswer) {
      onAnswer(newlySelected) // Call onAnswer function with selected rating
    }
    // Dispatch relevant actions
  }

  function optionDeselect() {
    setOption(null)
    // Dispatch relevant actions
  }

  const selectHandler = (newlySelected) => {
    if (selectedOption === newlySelected) {
      optionDeselect()
    } else {
      optionSelect(newlySelected)
      // Dispatch relevant actions
    }
  }

  return (
    <div className="flex flex-row items-center  space-x-4 h-100">
      {ratingOps.map((item) => (
        <button
          className={`w-${diameter} h-${diameter} rounded-full flex items-center justify-center focus:outline-none ${
            selectedOption === item
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
          onClick={() => selectHandler(item)}
          key={item}
        >
          <span className={` w-10 font-bold text-lg text-center h-${diameter}`}>
            {item}
          </span>
        </button>
      ))}
    </div>
  )
}
