interface IsFinished {
  points: Number;
  maxPossiblePoints: Number;
  numQuestions: Number;
  highScore: Number;
  dispatch(data: any): void;
}

function Finish({
  points,
  maxPossiblePoints,
  numQuestions,
  highScore,
  dispatch,
}: IsFinished) {
  const percentage = (+points / +maxPossiblePoints) * 100;

  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage > 80 && percentage < 100) emoji = "🥳";
  if (percentage > 50 && percentage < 80) emoji = "😊";
  if (percentage > 0 && percentage < 50) emoji = "🥺";

  return (
    <>
      <p className="result">
        In {+numQuestions} question(s)
        <br /> {emoji} Your score is {+points} out of {+maxPossiblePoints} (
        {Math.round(percentage)}%)
      </p>
      <p className="highscore"> High score: {+highScore}</p>
      <button
        className="btn btn-ui"
        onClick={() =>
          dispatch({ type: "restart", totalQuestion: numQuestions })
        }
      >
        Restart Game
      </button>
    </>
  );
}

export default Finish;
