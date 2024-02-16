export function spliceNoMutate(surveyAnswers, qId) {
  const newSurveyAnswers = surveyAnswers
  delete newSurveyAnswers[qId]
  return newSurveyAnswers
}

export function removeSurveyAnswer(surveyAnswers, qId) {
  var newSurveyAnswers = spliceNoMutate(surveyAnswers, qId)
  return newSurveyAnswers
}


export function filterAnswerElement(answer, surveyQuestionIds, remainingSet) {
  const surveyIdToBeChecked = answer['survey_question_id']
  const isRequiredNumber = (element) => element === surveyIdToBeChecked
  var responseId = surveyQuestionIds.findIndex(isRequiredNumber)
  if (responseId == -1) remainingSet.push(answer)
}

export function filterSurveyResponse(finalAnswerSet, surveyQuestionIds) {
  var remainingSet = []
  for (const [key, value] of Object.entries(finalAnswerSet)) {
    filterAnswerElement(value, surveyQuestionIds, remainingSet)
  }
  return remainingSet
}

export function sumAllPoints(pointDict) {
  const pointVals = Object.values(pointDict)
  const pointSum = pointVals.reduce(
    (partialSum, point) => partialSum + point,
    0,
  )
  return pointSum
}


