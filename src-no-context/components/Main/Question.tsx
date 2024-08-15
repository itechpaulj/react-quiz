import Option from "./Option";

interface IsQuestion {
  question: any; // reason result is a object
  dispatch(data: any): void; // callBack function
  answer: any; // possible has a return null
}

function Question({ question, dispatch, answer }: IsQuestion) {
  const { question: currentQuestion } = question;
  return (
    <div>
      <h4>{currentQuestion}</h4>
      <Option question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}

export default Question;
