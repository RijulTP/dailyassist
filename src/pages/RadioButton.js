import React, { useState, useEffect } from "react"
import { View, Text, Pressable } from "react"
// import styles from 'pages/Survey/surveystyles'
// import { setSurveyAnswer, setComponentIncentive } from 'slices/app.slice'
import { useSelector, useDispatch } from "react-redux"

const NO_POINTS = 0

export default function RadioButton({
  radioButtons,
  surveyQid,
  qType,
  surveyId,
  qNum,
  points,
}) {
  const dispatch = useDispatch()
  const [selectedOption, setOption] = useState(null)
  const currentAnswer = useSelector((state) => {
    if (state.app.surveyAnswers[surveyId]) {
      if (state.app.surveyAnswers[surveyId][qNum])
        return state.app.surveyAnswers[surveyId][qNum]["user_answer"]["answer"]
    }
  })

  useEffect(() => {
    if (currentAnswer) {
      // dispatch(setComponentIncentive({ surveyQid: qNum, pointStatus: points }))
    }
    setOption(currentAnswer)
  }, [])

  function optionSelect(newlySelected, surveyQid, answerElement) {
    dispatch(
      setSurveyAnswer({
        surveyQid: surveyQid,
        answerElement: answerElement,
        surveyId: surveyId,
      })
    )
    setOption(newlySelected)
    // dispatch(setComponentIncentive({ surveyQid: qNum, pointStatus: points }))
  }

  function optionDeselect(surveyQid) {
    // dispatch(setSurveyAnswer({ surveyQid: surveyQid, surveyId: surveyId }))
    setOption(null)
    // dispatch(setComponentIncentive({ surveyQid: qNum, pointStatus: NO_POINTS }))
  }

  const selectHandler = (newlySelected) => {
    const answerElement = {
      survey_question_id: surveyQid,
      surveyId: surveyId,
      user_answer: { type: qType, answer: newlySelected },
    }
    if (selectedOption === newlySelected) optionDeselect(qNum)
    else optionSelect(newlySelected, qNum, answerElement)
  }

  return (
    <View style={styles.radioButtons}>
      {radioButtons.map((item) => {
        let keyToBeAdded = "uniqueKey" + item.value
        return (
          <Pressable
            style={
              item.value === currentAnswer ? styles.selected : styles.unSelected
            }
            onPress={() => {
              selectHandler(item.value)
            }}
            key={keyToBeAdded}
          >
            <Text
              style={[
                styles.setFontSizeTwo,
                { fontWeight: "bold" },
                styles.option,
              ]}
            >
              {item.value}
            </Text>
          </Pressable>
        )
      })}
    </View>
  )
}
