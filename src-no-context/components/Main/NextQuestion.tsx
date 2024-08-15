interface IsNextQuestion {
  dispatch(data: any): void;
  answer: any;
  numQuestions: Number;
  index: Number;
  points: Number;
}

function NextQuestion({
  dispatch,
  answer,
  numQuestions,
  index,
  points,
}: IsNextQuestion) {
  if (answer === null) return <></>;
  if (+index < +numQuestions - 1) {
    return (
      <>
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "nextQuestion" })}
        >
          Next Button
        </button>
      </>
    );
  }

  if (+index === +numQuestions - 1) {
    return (
      <>
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "finish", points: points })}
        >
          Finish
        </button>
      </>
    );
  }
  return <></>;
}

export default NextQuestion;
