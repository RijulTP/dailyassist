import React from "react"
import RadioButton from "./RadioButton"
import Rating from "./Rating"
import Descriptive from "./descriptive"

const WORDLIMIT = 140

const MULTIPLE_CHOICE_TYPE = 3
const YES_NO_TYPE = 2
const RATING_TYPE = 4
const PARA_TYPE = 1

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
        console.log("Inside mulchoicetype")
        return (
          <RadioButton
            radioButtons={props.choices}
            surveyQid={props.surveyQid}
            qType={typeIdToTypeName(props.qType)}
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
            qType={typeIdToTypeName(props.qType)}
            surveyId={props.surveyId}
            qNum={props.qNum}
            points={YES_NO_INCENTIVE}
          />
        )
      case RATING_TYPE:
        const choiceNo = 5
        return (
          <Rating
            choiceNo={choiceNo}
            surveyQid={props.surveyQid}
            qType={typeIdToTypeName(props.qType)}
            surveyId={props.surveyId}
            qNum={props.qNum}
            points={RATING_INCENTIVE}
          />
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

  const styleType =
    typeIdToTypeName(props.qType) === RATINGCONTAINER
      ? "ratingContainer"
      : "itemContainer"

  return (
    <div className={`${styleType} rounded-lg shadow-md p-8 mx-10 max-w-md`}>
      <div className="flex items-center justify-center w-6 h-6 bg-blue-500 text-white font-bold text-lg rounded-full mb-6">
        {props.qNum}
      </div>
      <div>
        <h1 className="font-bold text-3xl mb-4">{props.name}</h1>
        {renderField()}
      </div>
    </div>
  )
}
