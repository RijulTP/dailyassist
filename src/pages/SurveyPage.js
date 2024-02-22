import React, { useEffect, useState } from "react"
import SurveyQuestion from "./SurveyQuestion"
import { useSearchParams } from "next/navigation"

const REQUIRED = "*required"

export default function SurveyPage() {
  const [surveyQuestions, setSurveyQuestions] = useState([])
  const [surveyTitle, setSurveyTitle] = useState("")
  const [surveyDescription, setSurveyDescription] = useState("")
  const searchParams = useSearchParams()
  const survey_id = searchParams.get("survey_id")

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

  return (
    <div>
      <div
        className="surveyBackground"
        style={{ overflowY: "scroll", height: "100vh" }}
      >
        <div className="surveyStartContainer">
          <h1 className="my-5 mx-10  text-3xl font-bold mb-4">{surveyTitle}</h1>
          <h2 className="mx-10  text-xl font-bold mb-8">{surveyDescription}</h2>
        </div>
        {surveyQuestions.map((qsObject, index) => (
          <div key={qsObject.survey_question_id}>
            <SurveyQuestion
              qNum={index + 1}
              qType={qsObject.type}
              name={qsObject.question_text}
              choices={qsObject.choices}
              incentiveVisible={true}
              surveyQid={qsObject.survey_question_id}
              surveyId={survey_id}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
