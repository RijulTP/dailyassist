import React, { useEffect, useState } from "react"
import { StyleSheet, Text, View } from "react"
import { useSelector } from "react-redux"
import styles from "./surveystyles"

const SLOTNUM = 4 // Number of slots for the Survey Top Bar
const BAR_ACTIVE = 1
const BAR_INACTIVE = 0

function generateQlist(qCount) {
  let range = (start, stop, step) =>
    Array.from(
      { length: (stop - start) / step + 1 },
      (_, i) => start + i * step
    )
  return range(1, qCount, 1)
}

function difference(allQuestions, attemptedQuestions) {
  let unAnsweredQuestions = new Set(
    [...allQuestions].filter((x) => !attemptedQuestions.has(x.toString()))
  )
  unAnsweredQuestions = [...unAnsweredQuestions]
  return unAnsweredQuestions
}

function sortDistances(distanceObject) {
  // Sort the distance object in ascending order, to get the nearest questions
  let sortedPairs = Object.entries(distanceObject)
  sortedPairs.sort(function (a, b) {
    return a[1] - b[1]
  })
  let sortNearest = []
  for (const i of sortedPairs) {
    sortNearest.push(i[0])
  }
  return sortNearest
}

function getDistances(questionYCoordMap, unAnsweredQuestions, scrollPoint) {
  // Function to make an object having Key: question and Value: question's distance from the user
  let distanceObject = {}
  for (const [key, value] of Object.entries(questionYCoordMap)) {
    if (unAnsweredQuestions.includes(parseInt(key))) {
      distanceObject[key] = Math.abs(value - scrollPoint)
    }
  }
  return distanceObject
}

function getCloseQs(unAnsweredQuestions, scrollPoint, questionYCoordMap) {
  let distanceObject = getDistances(
    questionYCoordMap,
    unAnsweredQuestions,
    scrollPoint
  )
  let sortedDistances = sortDistances(distanceObject)
  return sortedDistances
}

function generateTopBarQuestions(
  unAnsweredQuestionCount,
  sortedUnAnsweredQuestions
) {
  let newTopBarQuestions = []
  for (var i = 0; i < SLOTNUM && i < unAnsweredQuestionCount; i++) {
    if (sortedUnAnsweredQuestions.length != 0)
      newTopBarQuestions.push(sortedUnAnsweredQuestions[i])
  }

  newTopBarQuestions.sort(function (a, b) {
    // Sorts the questions in ascending order
    return a - b
  })
  return newTopBarQuestions
}

function selectNearestQuestions(
  unAnsweredQuestions,
  scrollPoint,
  questionYCoordMap
) {
  let unAnsweredQuestionCount = unAnsweredQuestions.length
  let sortedUnAnsweredQuestions = getCloseQs(
    unAnsweredQuestions,
    scrollPoint,
    questionYCoordMap
  )
  let newTopBarQuestions = generateTopBarQuestions(
    unAnsweredQuestionCount,
    sortedUnAnsweredQuestions
  )
  return newTopBarQuestions
}

function loadTopBarQuestions(
  surveyQuestionCount,
  surveyAnswers,
  scrollPosition,
  coordObject,
  setTopBarQuestions,
  setBarStatus
) {
  var allQuestions = new Set(generateQlist(surveyQuestionCount))

  if (surveyAnswers)
    var attemptedQuestions = new Set(Object.keys(surveyAnswers))
  else var attemptedQuestions = new Set([])

  const unAnsweredQuestions = difference(allQuestions, attemptedQuestions)
  const newTopBarQuestions = selectNearestQuestions(
    unAnsweredQuestions,
    scrollPosition,
    coordObject
  )
  if (Object.keys(coordObject).length != 0) setBarStatus(BAR_ACTIVE)
  setTopBarQuestions(newTopBarQuestions)
}

export default function StickyTopBar({
  surveyId,
  surveyQuestionCount,
  scrollRef,
  coordObject,
  scrollPosition,
}) {
  const [topBarQuestions, setTopBarQuestions] = useState([])
  const [barStatus, setBarStatus] = useState(BAR_INACTIVE)
  const surveyAnswers = useSelector((state) => {
    return state.app.surveyAnswers[surveyId]
  })
  const renderCount = useSelector((state) => {
    return state.app.renderCount
  })

  useEffect(() => {
    loadTopBarQuestions(
      surveyQuestionCount,
      surveyAnswers,
      scrollPosition,
      coordObject,
      setTopBarQuestions,
      setBarStatus
    )
  }, [renderCount])

  useEffect(() => {
    loadTopBarQuestions(
      surveyQuestionCount,
      surveyAnswers,
      scrollPosition,
      coordObject,
      setTopBarQuestions,
      setBarStatus
    )
  }, [surveyAnswers])

  return (
    <View style={[containerStyle.rowContainer, styles.stickyTopBar]}>
      <Text style={styles.topBarText}>
        {topBarQuestions.length == 0 ? (
          barStatus == BAR_INACTIVE ? (
            <Text>Loading...</Text>
          ) : (
            <Text>Good job! All questions are answered!</Text>
          )
        ) : (
          <Text>Try these!</Text>
        )}
      </Text>
      <View style={[containerStyle.rowContainer, styles.topBarContent]}>
        {topBarQuestions.map((slot, index) => {
          return (
            <button
              style={styles.nearestQuestions}
              key={index}
              onPress={() => {
                scrollRef.current.scrollTo({
                  x: 0,
                  y: coordObject[slot],
                  animated: true,
                })
              }}
            >
              <Text style={styles.nearestQuestionsText}>{slot}</Text>
            </button>
          )
        })}
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
