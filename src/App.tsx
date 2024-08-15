import React, { useEffect, useReducer } from "react";

// components header
import Header from "./components/Header/Header";

// components Main
import Main from "./components/Main/Main";
import Loader from "./components/Main/Loader";
import ErrorComponent from "./components/Main/ErrorComponent";
import StartScreen from "./components/Main/StartScreen";
import Question from "./components/Main/Question";
import NextQuestion from "./components/Main/NextQuestion";
import Footer from "./components/Main/Footer";
import Timer from "./components/Main/Timer";
import Progress from "./components/Main/Progress";
import Finish from "./components/Main/Finish";
import { QuizUseContext } from "./contexts/QuizContext";

function App() {
  const {
    status,
    numQuestions,
    dispatch,
    points,
    maxPossiblePoints,
    highScore,
    index,
    answer,
    secondsRemaining,
    questions,
  } = QuizUseContext();

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <ErrorComponent />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "start" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              maxPossiblePoints={maxPossiblePoints}
              points={points}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />

            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextQuestion
                dispatch={dispatch}
                answer={answer}
                numQuestions={numQuestions}
                index={index}
                points={points}
              />
            </Footer>
          </>
        )}
        {status === "finish" && (
          <Finish
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            numQuestions={numQuestions}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
