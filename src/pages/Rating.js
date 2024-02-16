import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, Pressable } from 'react'
// import styles from 'pages/Survey/surveystyles'
// import { setSurveyAnswer, setComponentIncentive } from 'slices/app.slice'
import { useSelector, useDispatch } from 'react-redux'

const DIAMETER_NUM1 = 50
const DIAMETER_NUM2 = 5.5

const TXTSIZE_NUM1 = 20
const TXTSIZE_NUM2 = 2
const DEFAULT_NUM = 5

const NO_POINTS = 0


export default function Rating({ choiceNo, surveyQid, qType, surveyId, qNum, points }) {
  const dispatch = useDispatch()
  const [selectedOption, setOption] = useState(null)
  const [ratingOps, setRatingOps] = useState([])
  const [diameter, setDiameter] = useState(0)
  const [txtSize, setTxtSize] = useState(0)
  const currentAnswer = useSelector((state) => {
    if (state.app.surveyAnswers[surveyId] && state.app.surveyAnswers[surveyId][qNum] ) {
        return state.app.surveyAnswers[surveyId][qNum]['user_answer']['answer']
    }
  })
  
  useEffect(() => {
    var newRatingOps = []
    for (let i = 1; i <= choiceNo; i++) {
      newRatingOps.push(i)
    }
    setRatingOps(newRatingOps)

    var newDiameter = DIAMETER_NUM1 - DIAMETER_NUM2 * (choiceNo - DEFAULT_NUM)
    var newTxtSize = TXTSIZE_NUM1 - TXTSIZE_NUM2 * (choiceNo - DEFAULT_NUM)
    setDiameter(newDiameter)
    setTxtSize(newTxtSize)
  }, [])

  useEffect(() => {
    if (currentAnswer) {
      // dispatch(
      //   setComponentIncentive({ surveyQid: qNum, pointStatus: points }),
      // )
    }
    setOption(currentAnswer)
  }, [])


  function optionSelect(newlySelected, surveyQid, answerElement) {
    setOption(newlySelected)
    // dispatch(
    //   setSurveyAnswer({
    //     surveyQid: qNum,
    //     answerElement: answerElement,
    //     surveyId: surveyId,
    //   }),
    // )
    // dispatch(
    //   setComponentIncentive({ surveyQid: qNum, pointStatus: points }),
    // )
  }

  function optionDeselect(surveyQid) {
    // dispatch(setSurveyAnswer({ surveyQid: qNum, surveyId: surveyId }))
    setOption(null)
    // dispatch(
    //   setComponentIncentive({ surveyQid: qNum, pointStatus: NO_POINTS }),
    // )
  }

  const selectHandler = (newlySelected) => {
    const selectedQs = newlySelected
    const answerElement = {
      survey_question_id: surveyQid,
      surveyId: surveyId,
      user_answer: { type: qType, answer: newlySelected },
    }

    if (selectedOption === newlySelected) optionDeselect(surveyQid)
    else optionSelect(newlySelected, surveyQid, answerElement)
  }


  return (
    <View style={containerStyle.rowContainer}>
      {ratingOps.map((item) => {
        var keyToBeAdded = 'uniqueKey' + item
        return (
          <Pressable
            style={
              item === currentAnswer
                ? [styles.ratingSelected, { width: diameter, height: diameter }]
                : [
                    styles.ratingUnSelected,
                    { width: diameter, height: diameter },
                  ]
            }
            onPress={() => selectHandler(item)}
            key={keyToBeAdded}
          >
            <Text
              style={[
                styles.setFontSizeTwo,
                {
                  fontWeight: 'bold',
                  fontSize: txtSize,
                  width: diameter,
                  textAlignVertical: 'center',
                  textAlign: 'center',
                },
                styles.ratingOption,
              ]}
            >
              {item}
            </Text>
          </Pressable>
        )
      })}
    </View>
  )
}


const containerStyle = {
  container: {
    padding: 8,
    backgroundColor: '#ffffff',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 3,
    marginBottom: 25,
  },
}
