import React, { useEffect, useState } from "react"
import SurveyQuestion from "./SurveyQuestion"
import { useSearchParams } from "next/navigation"

const REQUIRED = "*required"

export default function SurveyPage() {
  const [surveyQuestions, setSurveyQuestions] = useState([])
  const [surveyTitle, setSurveyTitle] = useState("")
  const [surveyDescription, setSurveyDescription] = useState("")
  const [currentPage, setCurrentPage] = useState(0)
  const [answers, setAnswers] = useState({})
  const searchParams = useSearchParams()
  const survey_id = searchParams.get("survey_id")

  useEffect(()=>{
    console.log("The answers are",answers)

  },[answers])
  const questionsPerPage = 1 // Change this value to adjust number of questions per page

  useEffect(() => {
    if (survey_id) {
      // Fetch survey details from the API
      fetch(`http://localhost:8000/dailyassist/view_survey_details/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ survey_id: survey_id }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data && data.survey_details && data.survey_details.questions) {
            setSurveyTitle(data.survey_details.survey_name)
            setSurveyDescription(data.survey_details.survey_description)
            setSurveyQuestions(data.survey_details.questions)
          }
        })
        .catch((error) =>
          console.error("Error fetching survey details:", error)
        )
    }
  }, [survey_id])

  const nextPage = () => {
    setCurrentPage(currentPage + 1)
  }

  const previousPage = () => {
    setCurrentPage(currentPage - 1)
  }

  const handleAnswer = (questionNumber, answer) => {
    setAnswers({ ...answers, [questionNumber]: answer })
  }

  return (
    <div className="p-8">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold mb-4">{surveyTitle}</h1>
        <h2 className="text-lg mb-8">{surveyDescription}</h2>
      </div>
      <div style={{ height: "600px" }}>
        {surveyQuestions
          .slice(
            currentPage * questionsPerPage,
            (currentPage + 1) * questionsPerPage
          )
          .map((qsObject, index) => (
            <div key={qsObject.survey_question_id} className="mb-8 text-center">
              <SurveyQuestion
                qNum={index + 1 + currentPage * questionsPerPage}
                qType={qsObject.type}
                name={qsObject.question_text}
                choices={qsObject.choices}
                incentiveVisible={true}
                surveyQid={qsObject.survey_question_id}
                surveyId={survey_id}
                className="mx-auto max-w-md"
                onAnswer={(answer) =>
                  handleAnswer(index + 1 + currentPage * questionsPerPage, answer)
                }
              />
            </div>
          ))}
      </div>
      <div className="text-center">
        {currentPage > 0 && (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
            onClick={previousPage}
          >
            Previous
          </button>
        )}
        {surveyQuestions.length > (currentPage + 1) * questionsPerPage && (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={nextPage}
          >
            Next
          </button>
        )}
      </div>
    </div>
  )
}
