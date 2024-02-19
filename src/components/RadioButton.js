import React, { useState } from "react"

export default function RadioButton({
  radioButtons,
  surveyQid,
  qType,
  surveyId,
  qNum,
  points,
}) {
  const [selectedOption, setOption] = useState(null)

  function optionSelect(newlySelected) {
    setOption(newlySelected)
    // Dispatch relevant actions
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
      <div className="flex flex-col gap-4">
        {radioButtons.map((item) => (
          <button
            className={`w-48 px-6 py-3 rounded-lg focus:outline-none ${
              selectedOption === item.value
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
            onClick={() => selectHandler(item.value)}
            key={item.value}
          >
            <span className="font-bold">{item.value}</span>
          </button>
        ))}
      </div>
    </>
  )
}
