import React, { useEffect, useState } from "react"
import { View, Text, TextInput } from "react"
import styles from "./surveystyles"
// import { setComponentIncentive, setSurveyAnswer } from 'slices/app.slice'
import { useSelector, useDispatch } from "react-redux"
import { removeSurveyAnswer } from "./surveyutils/utils"

const NO_POINTS = 0
const MIN_INCENTIVE_LEN = 10

export default function Descriptive({
  wordLimit,
  surveyQid,
  qType,
  surveyId,
  qNum,
  points,
}) {
  const [answer, setAnswer] = useState("")
  const dispatch = useDispatch()
  const { surveyAnswers } = useSelector((state) => state.app)
  const currentAnswer = useSelector((state) => {
    if (
      state.app.surveyAnswers[surveyId] &&
      state.app.surveyAnswers[surveyId][qNum]
    ) {
      return state.app.surveyAnswers[surveyId][qNum]["user_answer"]["answer"]
    }
  })

  const answerElement = {
    survey_question_id: surveyQid,
    surveyId: surveyId,
    user_answer: { type: qType, answer: answer },
  }
  var answers = JSON.parse(JSON.stringify(surveyAnswers))

  useEffect(() => {
    if (currentAnswer) {
      setAnswer(currentAnswer)
      if (currentAnswer.length >= MIN_INCENTIVE_LEN) {
        dispatch(
          setComponentIncentive({ surveyQid: qNum, pointStatus: points })
        )
      }
    }
  }, [])

  useEffect(() => {
    checkAnswer()
  }, [answer])

  function checkAnswer() {
    answers = removeSurveyAnswer(answers, surveyQid)
    if (answer != "") {
      let finalPoints = answer.length >= MIN_INCENTIVE_LEN ? points : NO_POINTS
      // dispatch(
      //   setComponentIncentive({
      //     surveyQid: qNum,
      //     pointStatus: finalPoints,
      //   }),
      // )
      // dispatch(
      //   setSurveyAnswer({
      //     surveyQid: qNum,
      //     answerElement: answerElement,
      //     surveyId: surveyId,
      //   }),
      // )
    } else {
      dispatch(setSurveyAnswer({ surveyQid: qNum, surveyId: surveyId }))
      dispatch(
        setComponentIncentive({ surveyQid: qNum, pointStatus: NO_POINTS })
      )
    }
  }

  return (
    <View>
      <View style={styles.descriptiveContainer}>
        <View>
          <TextInput
            placeholder="Enter your answer"
            multiline
            maxLength={wordLimit}
            autoCorrect={true}
            spellCheck={true}
            autoCapitalize="sentences"
            style={{ margin: 10 }}
            onChangeText={(text) => setAnswer(text)}
            value={answer}
          />
        </View>
      </View>
      <Text style={[styles.answerLimit, { fontSize: 10, fontWeight: "bold" }]}>
        {wordLimit - answer.length}
      </Text>
    </View>
  )
}
