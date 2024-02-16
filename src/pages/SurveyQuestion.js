import { StyleSheet, View, Text } from "react"
// import styles from "pages/Survey/surveystyles"
import RadioButton from "./RadioButton"
import Rating from "./Rating"
import { useState } from "react"
import Descriptive from "./descriptive"
import React from "react"

const MULTIPLE_CHOICE = "multiple_choice"
const RATING = "0-5"
const YES_NO = "yes_no"
const PARAGRAPH = "paragraph"

const PARA_TYPE = 1
const PARA_INCENTIVE = 10

const YES_NO_TYPE = 2
const YES_NO_INCENTIVE = 2

const MULTIPLE_CHOICE_TYPE = 3
const MULTIPLE_CHOICE_INCENTIVE = 3

const RATING_TYPE = 4
const RATING_INCENTIVE = 5

const WORDLIMIT = 140

const RATINGCONTAINER = "Rating"

function typeIdToTypeName(id) {
  if (id == 1) return PARAGRAPH
  else if (id == 2) return YES_NO
  else if (id == 3) return MULTIPLE_CHOICE
  else if (id == 4) return RATING
}

function typeIdToIncentive(id) {
  if (id == 1) return PARA_INCENTIVE
  else if (id == 2) return YES_NO_INCENTIVE
  else if (id == 3) return MULTIPLE_CHOICE_INCENTIVE
  else if (id == 4) return RATING_INCENTIVE
}

function renderField(props, setOption) {
  if (props.qType == MULTIPLE_CHOICE_TYPE) {
    const radioButtons = props.choices
    return (
      <RadioButton
        radioButtons={radioButtons}
        surveyQid={props.surveyQid}
        qType={typeIdToTypeName(props.qType)}
        surveyId={props.surveyId}
        qNum={props.qNum}
        points={MULTIPLE_CHOICE_INCENTIVE}
      />
    )
  } else if (props.qType == YES_NO_TYPE) {
    const radioButtons = props.choices
    return (
      <RadioButton
        radioButtons={radioButtons}
        surveyQid={props.surveyQid}
        qType={typeIdToTypeName(props.qType)}
        surveyId={props.surveyId}
        qNum={props.qNum}
        points={YES_NO_INCENTIVE}
      />
    )
  } else if (props.qType === RATING_TYPE) {
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
  } else if (props.qType === PARA_TYPE) {
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
  }
}

export default function SurveyQuestion(props) {
  const [option, setOption] = useState(null)
  if (typeIdToTypeName(props.qType) === RATINGCONTAINER) {
    var styleType = styles.ratingContainer
  } else {
    var styleType = styles.itemContainer
  }

  return (
    <View style={[styleType, { alignSelf: "center" }]}>
      <View style={containerStyle.columnContainer}>
        <View style={containerStyle.rowContainer}>
          <View>
            <Text style={[styles.incentive, { fontWeight: "bold" }]}>
              {" "}
              {typeIdToIncentive(props.qType)} HK
            </Text>
          </View>
          <View
            style={[
              styles.requiredIconCircle,
              { opacity: props.required ? 1 : 0 },
            ]}
          >
            <Text style={styles.requiredIconText}>*</Text>
          </View>
        </View>
        <Text
          style={[
            styles.setFontSizeTwo,
            styles.surveyQuestion,
            { fontWeight: "bold" },
          ]}
        >
          {"\n"}
          {props.name}
          {"\n"}
        </Text>
        <Text
          style={[
            styles.qNo,

            { fontWeight: "bold" },
            { textAlign: "center" },
            { textAlignVertical: "center" },
          ]}
        >
          {props.qNum}
        </Text>
        {renderField(props, setOption)}
      </View>
    </View>
  )
}

const containerStyle = {
  container: {
    padding: 8,
    backgroundColor: "#ffffff",
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  columnContainer: {
    flexDirection: "column",
  },
}
