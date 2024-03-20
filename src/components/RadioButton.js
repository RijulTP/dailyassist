import React, { useState, useEffect } from "react"

export default function RadioButton({
  radioButtons,
  surveyQid,
  qType,
  surveyId,
  qNum,
  points,
  onAnswer, // Add onAnswer prop
  answers, // Add answers prop
}) {
  const [selectedOption, setSelectedOption] = useState(null)

  useEffect(() => {
    if (answers[qNum]) {
      setSelectedOption(answers[qNum])
    }
  }, [answers, qNum])

  function optionSelect(newlySelected) {
    setSelectedOption(newlySelected)
    if (onAnswer) {
      onAnswer(newlySelected) // Call onAnswer function with selected option
    }
  }

  function optionDeselect() {
    setSelectedOption(null)
    if (onAnswer) {
      onAnswer(null) // Call onAnswer function with null to signify deselection
    }
  }

  const selectHandler = (newlySelected) => {
    console.log(
      "selectedoption:",
      selectedOption,
      "newlySelected:",
      newlySelected
    )
    if (selectedOption === newlySelected) {
      console.log("Deselecting..")
      optionDeselect()
    } else {
      optionSelect(newlySelected)
    }
  }

  return (
    <>
      <div className="flex flex-col items-center gap-4 h-100">
        {radioButtons.map((item) => (
          <button
            className={`w-48 px-6 py-3 rounded-lg focus:outline-none ${
              selectedOption === item
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
            onClick={() => selectHandler(item)}
            key={item}
          >
            <span className="font-bold">{item}</span>
          </button>
        ))}
      </div>
    </>
  )
}
