import React, { useEffect, useState } from "react"
import SurveyQuestion from "./SurveyQuestion"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/router"
import { useSelector } from "react-redux"
import SpinnerComponent from "@/components/SpinnerComponent"
const HOST_LOCAL = "http://localhost:8000"
const HOST_PROD = "https://dailyassist-backend.vercel.app"
// const HOST_PROD = "http://localhost:8000"

const REQUIRED = "*required"

export default function SurveyPage() {
  const [surveyQuestions, setSurveyQuestions] = useState([])
  const [surveyTitle, setSurveyTitle] = useState("")
  const [surveyDescription, setSurveyDescription] = useState("")
  const [currentPage, setCurrentPage] = useState(0)
  const [answers, setAnswers] = useState({})
  const searchParams = useSearchParams()
  const survey_id = searchParams.get("survey_id")
  const router = useRouter()
  const user_id = useSelector((state) => state.auth.userId)

  const [surveySpinner, setSurveySpinner] = useState(false)
  useEffect(() => {
    console.log("The answers are", answers)
  }, [answers])

  const questionsPerPage = 1 // Change this value to adjust number of questions per page

  useEffect(() => {
    const fetchData = async () => {
      if (survey_id) {
        setSurveySpinner(true)

        try {
          const response = await fetch(
            `${HOST_PROD}/dailyassist/view_survey_details/`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ survey_id: survey_id }),
            }
          )

          const data = await response.json()

          if (data && data.survey_details && data.survey_details.questions) {
            setSurveyTitle(data.survey_details.survey_name)
            setSurveyDescription(data.survey_details.survey_description)
            setSurveyQuestions(data.survey_details.questions)
          }
        } catch (error) {
          console.error("Error fetching survey details:", error)
        } finally {
          setSurveySpinner(false)
        }
      }
    }

    fetchData() // Call the function within useEffect

    // Dependency array (remains the same)
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

  const handleSubmit = () => {
    // Send answers to API
    fetch(`${HOST_PROD}/dailyassist/submit_survey/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user_id,
        survey_id: survey_id,
        answer_json: answers,
      }),
    })
      .then(() => {
        console.log("Survey submitted successfully")
        router.push("/SurveySubmitted")
      })
      .catch((error) => {
        console.error("Error submitting survey answers:", error)
      })
  }

  return (
    <div className=" min-h-screen p-8">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold mb-4">{surveyTitle}</h1>
        <h2 className="text-lg mb-8">{surveyDescription}</h2>
      </div>
      {surveySpinner ? <SpinnerComponent /> : null}
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
                  handleAnswer(
                    index + 1 + currentPage * questionsPerPage,
                    answer
                  )
                }
                answers={answers}
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
        {currentPage === surveyQuestions.length / questionsPerPage - 1 && (
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleSubmit}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  )
}
