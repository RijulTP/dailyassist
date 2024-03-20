import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

const NO_POINTS = 0
const MIN_INCENTIVE_LEN = 10

export default function Descriptive({
  wordLimit,
  surveyQid,
  qType,
  surveyId,
  qNum,
  points,
  onAnswer // Add onAnswer prop
}) {
  const [answer, setAnswer] = useState("")
  const dispatch = useDispatch()

  useEffect(() => {
    checkAnswer()
  }, [answer])

  function checkAnswer() {
    let finalPoints = NO_POINTS
    if (answer.length >= MIN_INCENTIVE_LEN) {
      finalPoints = points
    }
    // Dispatch relevant actions
    if (onAnswer) {
      onAnswer(answer) // Call onAnswer function with the entered answer
    }
  }

  const handleChange = (e) => {
    const text = e.target.value
    setAnswer(text)
  }

  return (
    <div>
      <div className="rounded-lg p-4 mb-4">
        <textarea
          placeholder="Enter your answer"
          rows={4}
          maxLength={wordLimit}
          value={answer}
          onChange={handleChange}
          className="w-full h-full resize-none focus:outline-none text-black" // Add text-black class here
        />
      </div>
      <span className="block text-sm font-bold mb-2">
        {wordLimit - answer.length} characters remaining
      </span>
    </div>
  )
}
