import React, { useState } from "react"

export default function RadioButton({
  radioButtons,
  surveyQid,
  qType,
  surveyId,
  qNum,
  points,
  onAnswer // Add onAnswer prop
}) {
  const [selectedOption, setOption] = useState(null)

  function optionSelect(newlySelected) {
    setOption(newlySelected)
    if (onAnswer) {
      onAnswer(newlySelected) // Call onAnswer function with selected option
    }
  }

  function optionDeselect() {
    // Dispatch relevant actions
    setOption(null)
  }

  const selectHandler = (newlySelected) => {
    const answerElement = {
      survey_question_id: surveyQid,
      surveyId: surveyId,
      user_answer: { type: qType, answer: newlySelected },
    }
    if (selectedOption === newlySelected) optionDeselect()
    else optionSelect(newlySelected)
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
