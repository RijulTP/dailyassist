import { View, Text, ScrollView } from "react"
import styles from "./surveystyles"
import SurveyQuestion from "./SurveyQuestion"
// import { initTotalIncentiveData, setRenderCount } from '../../slices/app.slice'
import { shallowEqual, useSelector, useDispatch } from "react-redux"
import React, { useEffect, useState } from "react"
// import SubmitButton from "./surveySubmitButton"
import StickyTopBar from "./StickyTopBar"
import { useRef } from "react"

const REQUIRED = "*required"

export default function Survey() {
  const [questionYCoordMap, setquestionYCoordMap] = useState({})
  const [yCoord, setYCoord] = useState({})
  const [scrollPosition, setScrollPosition] = useState(0)
  const [renderDone, setRenderDone] = useState(false)

  const surveyQuestions = [
    {
      survey_question_id: 1,
      type: "multiple_choice",
      question_text: "What is your favorite color?",
      choices: ["Red", "Blue", "Green", "Yellow"],
    },
    {
      survey_question_id: 2,
      type: "text",
      question_text: "What is your name?",
    },
    {
      survey_question_id: 3,
      type: "multiple_choice",
      question_text: "Which of the following programming languages do you use?",
      choices: ["JavaScript", "Python", "Java", "C++", "Other"],
    },
    // Add more questions as needed
  ]

  var finalAnswerSet
  var surveyQuestionIds = []

  //   useEffect(() => {
  //     finalAnswerSet = updatedResponses
  //   }, [updatedResponses])

  async function getSurveyQuestions() {
    let response = await getAPI(apiCall)
    var surveyQuestions = await response.json()
    return surveyQuestions
  }

  useEffect(() => {
    // Adds each questions coordinates to the questionYCoordMap
    if (yCoord["qNum"] !== undefined) {
      // To prevent accessing qNum in an empty ycoord (during initial render)
      let newQuestionYCoordMap = { ...questionYCoordMap }
      newQuestionYCoordMap[yCoord["qNum"]] = yCoord["coord"]
      setquestionYCoordMap(newQuestionYCoordMap)
    }
  }, [yCoord])

  useEffect(() => {
    if (Object.keys(questionYCoordMap).length == surveyQnum) {
      //   dispatch(setRenderCount())
      setRenderDone(true)
    }
  }, [questionYCoordMap])

  useEffect(() => {
    ;(async () => {
      var surveyQuestions = await getSurveyQuestions()
      setSurveyQuestions(surveyQuestions)
    })()
  }, [])

  useEffect(() => {
    // dispatch(initTotalIncentiveData())
  }, [])

  const dispatch = useDispatch()
  const scrollViewRef = useRef()

  return (
    <View>
      <StickyTopBar
        // surveyId={surveyId}
        surveyId={1}
        // surveyQuestionCount={surveyQnum}
        surveyQuestionCount={10}
        scrollRef={scrollViewRef}
        coordObject={questionYCoordMap}
        scrollPosition={scrollPosition}
      />
      <ScrollView
        style={styles.surveyBackground}
        ref={scrollViewRef}
        onScroll={(event) => {
          setScrollPosition(event.nativeEvent.contentOffset.y)
        }}
      >
        <View style={styles.surveyStartContainer}>
          <Text style={[styles.surveyTitlePage, { fontWeight: "bold" }]}>
            {/* {surveyName} */}
            Hello
          </Text>
        </View>
        {surveyQuestions.map((qsObject, index) => {
          surveyQuestionIds.push(qsObject["survey_question_id"])
          return (
            <View
              onLayout={({ nativeEvent }) => {
                if (renderDone == false) {
                  setYCoord({ qNum: index + 1, coord: nativeEvent.layout.y })
                }
              }}
              key={qsObject["survey_question_id"]}
            >
              {/* <SurveyQuestion
                qNum={index + 1}
                qType={qsObject["type"]}
                name={qsObject["question_text"]}
                choices={qsObject["choices"]}
                incentiveVisible={true}
                surveyQid={qsObject["survey_question_id"]}
                key={qsObject["survey_question_id"]}
                // surveyId={surveyId}
                surveyId={1}
              /> */}
            </View>
          )
        })}

        {/* <SubmitButton navigation={navigation} surveyId={surveyId} /> */}
      </ScrollView>
    </View>
  )
}
