import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import questions from "../components/data/questions.json";
let { questions: getQuestions } = questions;

const SECS_PER_QUESTION: Number = 30;
type IsInitialize = {
  status: String; // required
  // optional
  questions: any[];
  index: Number;
  answer: any;
  payload: any;
  points: Number;
  totalQuestion: any;
  highScore: Number;
  secondsRemaining: any;
};

const initialize: IsInitialize = {
  // status => loading / error / ready / active / start/ finished
  status: "loading",

  // optional
  questions: getQuestions,
  index: 0, // index based in the number per each question
  answer: null, // null basically nothing to do, but if click the Correct answer will be display temporary value
  payload: null, // display current correct answer
  points: 0, // points per each correct answer
  totalQuestion: null,
  highScore: 0,
  secondsRemaining: null, //
};

function reducer(state: IsInitialize, action: any) {
  switch (`${action.type}`) {
    case "dataRecieved":
      return {
        ...state,
        status: "ready",
        questions: action.payload,
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
        payload: action.payload,
      };
    case "start":
      return {
        ...state,
        status: "start",
        secondsRemaining: state.questions
          ? +state.questions.length * +SECS_PER_QUESTION
          : 0,
        totalQuestion: action.totalQuestion,
      };
    case "newAnswered":
      const indexStart: Number = state.index ? state.index : 0; // index start array in questions : any[]
      const question: any = state.questions ? state.questions[+indexStart] : 0; // current question, possibly return object value
      const trulyAnsweredBoolean = action.payload === question.correctOption; // if answered truly or falsy
      const currentPoints = trulyAnsweredBoolean
        ? state.points + question.points
        : state.points;
      return {
        ...state,
        answer: action.payload,
        points: currentPoints,
      };
    case "nextQuestion":
      const indexNextQuestion: Number = state.index ? state.index : 0; // index start array in questions : any[]
      return {
        ...state,
        index: +indexNextQuestion + 1,
        answer: null,
      };
    case "finish":
      console.log(action.type);
      return {
        ...state,
        status: "finish",
        secondsRemaining: state.questions
          ? +state.questions.length * +SECS_PER_QUESTION
          : 0,
        highScore:
          state.highScore && state.highScore > action.points
            ? state.highScore
            : state.points || 0,
      };
    case "restart":
      return {
        ...state,
        status: "ready",
        index: 0,
        answer: null,
        payload: null,
        points: 0,
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: action.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finish" : state.status,
      };
    default:
      throw new Error("Action Unknown!!");
  }
}
const QuizCreateContext = createContext<any>(null);

function QuizContext({ children }: { children: ReactNode }) {
  const [state, dispatch]: any = useReducer<any>(reducer, initialize);
  const {
    questions,
    index,
    answer,
    status,
    totalQuestion,
    points,
    secondsRemaining,
    highScore,
  }: any = state;

  const numQuestions = questions?.length || totalQuestion;

  const maxPossiblePoints: Number =
    questions?.reduce((acc: Number, curr: any) => {
      return +acc + +curr.points;
    }, 0) ?? 0;

  useEffect(function () {
    async function fetchApiQuiz(): Promise<any> {
      try {
        // const controller = new AbortController();

        // const res = await fetch(`https://react-quiz-itechpaulj.netlify.app`, {
        //   signal: controller.signal,
        // });

        // if (!res.ok) {
        //   throw new Error(`Status: ${res.status}, Error: ${res.statusText}`);
        // }

        // const dataJson = await res.json();
        const result = questions;

        dispatch({
          type: "dataRecieved",
          payload: result,
        });
      } catch (err) {
        if (err instanceof Error) {
          dispatch({
            type: "dataFailed",
            payload: err.message,
          });
        }
      }
    }

    fetchApiQuiz();
  }, []);

  return (
    <>
      <QuizCreateContext.Provider
        value={{
          questions,
          index,
          answer,
          status,
          totalQuestion,
          points,
          secondsRemaining,
          highScore,
          numQuestions,
          maxPossiblePoints,
          dispatch,
        }}
      >
        {children}
      </QuizCreateContext.Provider>
    </>
  );
}

function QuizUseContext() {
  const context = useContext(QuizCreateContext);

  if (!context) {
    throw new Error("There was a problem useContext");
  }

  return context;
}

export { QuizContext, QuizUseContext };
