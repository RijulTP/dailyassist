import React from "react"
import RadioButton from "../components/RadioButton"
import Rating from "../components/Rating"
import Descriptive from "../components/descriptive"

const WORDLIMIT = 140

const MULTIPLE_CHOICE_TYPE = "multiple_choice"
const YES_NO_TYPE = "yes_no"
const RATING_TYPE = "rating"
const PARA_TYPE = "paragraph"

const MULTIPLE_CHOICE_INCENTIVE = 3
const YES_NO_INCENTIVE = 2
const RATING_INCENTIVE = 5
const PARA_INCENTIVE = 10

const RATINGCONTAINER = "Rating"

function typeIdToTypeName(id) {
  switch (id) {
    case 1:
      return "paragraph"
    case 2:
      return "yes_no"
    case 3:
      return "multiple_choice"
    case 4:
      return "0-5"
    default:
      return ""
  }
}

export default function SurveyQuestion(props) {
  console.log(props.qType)
  const renderField = () => {
    switch (props.qType) {
      case MULTIPLE_CHOICE_TYPE:
        console.log(">>>>Inside mulchoicetype", props.choices)
        return (
          <RadioButton
            radioButtons={props.choices}
            surveyQid={props.surveyQid}
            qType={props.qType}
            surveyId={props.surveyId}
            qNum={props.qNum}
            points={MULTIPLE_CHOICE_INCENTIVE}
          />
        )
      case YES_NO_TYPE:
        return (
          <RadioButton
            radioButtons={props.choices}
            surveyQid={props.surveyQid}
            qType={props.qType}
            surveyId={props.surveyId}
            qNum={props.qNum}
            points={YES_NO_INCENTIVE}
          />
        )
      case RATING_TYPE:
        const choiceNo = 5
        return (
          <div className="flex justify-center">
            <Rating
              choiceNo={choiceNo}
              surveyQid={props.surveyQid}
              qType={props.qType}
              surveyId={props.surveyId}
              qNum={props.qNum}
              points={RATING_INCENTIVE}
            />
          </div>
        )
      case PARA_TYPE:
        return (
          <Descriptive
            wordLimit={WORDLIMIT}
            surveyQid={props.surveyQid}
            qType={typeIdToTypeName(props.qType)}
            surveyId={props.surveyId}
            qNum={props.qNum}
            points={PARA_INCENTIVE}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className={`rounded-lg shadow-md p-8 mx-auto max-w-3xl`}>
      <div className="flex items-center justify-center w-12 h-12 bg-blue-500 text-white font-bold text-2xl rounded-full mb-6">
        {props.qNum}
      </div>
      <div>
        <h1 className="font-bold text-4xl mb-4 text-center">{props.name}</h1>
        {renderField()}
      </div>
    </div>
  )
}
