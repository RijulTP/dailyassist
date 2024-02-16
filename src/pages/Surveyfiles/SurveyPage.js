import { View, Text, ScrollView } from "react"
import styles from "../surveystyles"
import SurveyQuestion from "../SurveyQuestion"
import { initTotalIncentiveData, setRenderCount } from "../../slices/app.slice"
import { urls } from "../config"
import { shallowEqual, useSelector, useDispatch } from "react-redux"
import React, { useEffect, useState } from "react"
import SubmitButton from "./surveySubmitButton"
import StickyTopBar from "./StickyTopBar"
import { useRef } from "react"
import { getAPI } from "components/api/apiwrapper"

const REQUIRED = "*required"

export default function SurveyPage({ route, navigation }) {
  const surveyId = route.params["survey_id"]
  const surveyName = route.params["survey_name"]
  const surveyQnum = route.params["survey_qnum"]
  const apiCall = urls.get_survey_questions + surveyId
  const [surveyQuestions, setSurveyQuestions] = useState([])
  const updatedResponses = useSelector(
    (state) => state.app.updatedResponses,
    shallowEqual
  )
  const [questionYCoordMap, setquestionYCoordMap] = useState({})
  const [yCoord, setYCoord] = useState({})
  const [scrollPosition, setScrollPosition] = useState(0)
  const [renderDone, setRenderDone] = useState(false)

  var finalAnswerSet
  var surveyQuestionIds = []

  useEffect(() => {
    finalAnswerSet = updatedResponses
  }, [updatedResponses])

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
      dispatch(setRenderCount())
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
    dispatch(initTotalIncentiveData())
  }, [])

  const dispatch = useDispatch()
  const scrollViewRef = useRef()

  return (
    <View>
      <StickyTopBar
        surveyId={surveyId}
        surveyQuestionCount={surveyQnum}
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
            {surveyName}
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
              <SurveyQuestion
                qNum={index + 1}
                qType={qsObject["type"]}
                name={qsObject["question_text"]}
                choices={qsObject["choices"]}
                incentiveVisible={true}
                surveyQid={qsObject["survey_question_id"]}
                key={qsObject["survey_question_id"]}
                surveyId={surveyId}
              />
            </View>
          )
        })}

        <SubmitButton navigation={navigation} surveyId={surveyId} />
      </ScrollView>
    </View>
  )
}
