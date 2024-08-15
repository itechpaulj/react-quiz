interface IsStartScreen {
  numQuestions: any;
  dispatch: any;
}

function StartScreen({ numQuestions, dispatch }: IsStartScreen) {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz</h2>
      <h3>{numQuestions} question(s) to React Mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start", totalQuestion: numQuestions })}
      >
        Let's start
      </button>
    </div>
  );
}
export default StartScreen;
