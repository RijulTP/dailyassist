import React, { useEffect, useState } from "react"
import SurveyQuestion from "./SurveyQuestion"
import StickyTopBar from "../components/StickyTopBar"
import { useSelector, useDispatch } from "react-redux"

const REQUIRED = "*required"

export default function SurveyPage() {
  const surveyQuestions = [
    {
      survey_question_id: 1,
      type: 1, // Assuming type 4 for scale
      question_text:
        "Describe your current level of productivity?",
    },
    {
      survey_question_id: 2,
      type: 4,
      question_text:
        "How satisfied are you with your work-life balance on a scale of 1 to 5?",
    },
    {
      survey_question_id: 3,
      type: 4,
      question_text:
        "On a scale of 1 to 5, how happy are you with your current situation?",
    },
    {
      survey_question_id: 4,
      type: 2, // Assuming type 2 for multiple choice
      question_text: "What are the main factors affecting your productivity?",
      choices: [
        { value: "Workload" },
        { value: "Distractions" },
        { value: "Time Management" },
        { value: "Health Issues" },
        { value: "Other" },
      ],
    },
    {
      survey_question_id: 5,
      type: 2,
      question_text:
        "Which of the following best describes your current work schedule?",
      choices: [
        { value: "9-5, Monday to Friday" },
        { value: "Flexible hours" },
        { value: "Shift work" },
        { value: "Freelance/Contractor" },
        { value: "Other" },
      ],
    },
    // Add more questions as needed
  ]

  // Define your API call function here
  async function getSurveyQuestions() {
    // Implement your API call logic here
  }

  useEffect(() => {
    const fetchSurveyQuestions = async () => {
      try {
        const surveyQuestionsData = await getSurveyQuestions()
        // Process survey questions data
      } catch (error) {
        console.error("Error fetching survey questions:", error)
      }
    }

    fetchSurveyQuestions()
  }, [])

  return (
    <div>
      <div
        className="surveyBackground"
        style={{ overflowY: "scroll", height: "100vh" }}
      >
        <div className="surveyStartContainer">
          {/* <h1 className="surveyTitlePage" style={{ fontWeight: "bold" }}>
            Hello
          </h1> */}
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
              surveyId={1}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
