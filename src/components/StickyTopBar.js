import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const SLOTNUM = 4; // Number of slots for the Survey Top Bar
const BAR_ACTIVE = 1;
const BAR_INACTIVE = 0;

function difference(allQuestions, attemptedQuestions) {
  let unAnsweredQuestions = new Set(
    [...allQuestions].filter((x) => !attemptedQuestions.has(x.toString()))
  );
  unAnsweredQuestions = [...unAnsweredQuestions];
  return unAnsweredQuestions;
}

function loadTopBarQuestions(
  surveyQuestionCount,
  surveyAnswers,
  scrollPosition,
  coordObject,
  setTopBarQuestions,
  setBarStatus
) {
  var allQuestions = new Set([...Array(surveyQuestionCount).keys()]);

  if (surveyAnswers) var attemptedQuestions = new Set(Object.keys(surveyAnswers));
  else var attemptedQuestions = new Set([]);

  const unAnsweredQuestions = difference(allQuestions, attemptedQuestions);

  // You need to implement the selectNearestQuestions function and related functions here.

  // For demonstration, let's assume selectNearestQuestions returns an array of nearest questions.

  const newTopBarQuestions = selectNearestQuestions(
    unAnsweredQuestions,
    scrollPosition,
    coordObject
  );

  if (Object.keys(coordObject).length !== 0) setBarStatus(BAR_ACTIVE);

  setTopBarQuestions(newTopBarQuestions);
}

export default function StickyTopBar({
  surveyQuestionCount,
  scrollRef,
  coordObject,
  scrollPosition,
}) {
  const [topBarQuestions, setTopBarQuestions] = useState([]);
  const [barStatus, setBarStatus] = useState(BAR_INACTIVE);
  // const surveyAnswers = useSelector((state) => {
  //   return state.app.surveyAnswers[surveyId];
  // });
  const renderCount = useSelector((state) => {
    return state.app.renderCount;
  });

  useEffect(() => {
    loadTopBarQuestions(
      surveyQuestionCount,
      surveyAnswers,
      scrollPosition,
      coordObject,
      setTopBarQuestions,
      setBarStatus
    );
  }, [renderCount]);

  useEffect(() => {
    loadTopBarQuestions(
      surveyQuestionCount,
      surveyAnswers,
      scrollPosition,
      coordObject,
      setTopBarQuestions,
      setBarStatus
    );
  }, [surveyAnswers]);

  return (
    <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
      <span>
        {topBarQuestions.length === 0 ? (
          barStatus === BAR_INACTIVE ? (
            <span>Loading...</span>
          ) : (
            <span>Good job! All questions are answered!</span>
          )
        ) : (
          <span>Try these!</span>
        )}
      </span>
      <div style={{ display: "flex", flexDirection: "row" }}>
        {topBarQuestions.map((slot, index) => {
          return (
            <button
              key={index}
              onClick={() => {
                scrollRef.current.scrollTo({
                  x: 0,
                  y: coordObject[slot],
                  behavior: "smooth",
                });
              }}
              style={{ marginLeft: "8px" }}
            >
              {slot}
            </button>
          );
        })}
      </div>
    </div>
  );
}
