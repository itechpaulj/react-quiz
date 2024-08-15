interface IsProgress {
  index: Number;
  numQuestions: Number;
  maxPossiblePoints: Number;
  points: Number;
  answer: any;
}

function Progress({
  index,
  numQuestions,
  maxPossiblePoints,
  points,
  answer,
}: IsProgress) {
  const currentQuestion: Number = +answer || 0;
  return (
    <header className="progress">
      <progress max={+numQuestions} value={+index + +currentQuestion} />
      <p>
        Question: {+index + 1}/{+numQuestions}
      </p>
      <p>
        <strong>
          {+points}/{+maxPossiblePoints}
        </strong>
      </p>
    </header>
  );
}
export default Progress;
