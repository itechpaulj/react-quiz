interface IsOption {
  question: any; // reason result is a object
  dispatch(data: any): void; // callBack function
  answer: any; // possible has a return null
}

function Option({ question, dispatch, answer }: IsOption) {
  const { options: listOptionAnswer } = question;
  const correctIndexAnswered = question.correctOption; // index for array Option list
  const hasAnswered = answer !== null; // default boolean false [no answered dipsplay, basically hide truly answer]
  const trulySelectedMyAnswer = answer; // user has a click the final answered
  return (
    <div className="options">
      {listOptionAnswer.map((option: String, index: Number) => (
        <button
          key={`${option}-${index}`}
          className={`btn btn-option 
                ${trulySelectedMyAnswer === index ? "answer" : ""}
                ${
                  hasAnswered
                    ? correctIndexAnswered === index
                      ? "correct"
                      : "wrong"
                    : ""
                }`}
          onClick={() =>
            dispatch({
              type: "newAnswered",
              payload: index,
            })
          }
          disabled={hasAnswered}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
export default Option;
