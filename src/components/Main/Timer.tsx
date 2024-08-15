import { useEffect } from "react";

interface Istimer {
  dispatch(data: any): void;
  secondsRemaining: Number;
}

function Timer({ dispatch, secondsRemaining }: Istimer) {
  const mins = Math.floor(+secondsRemaining / 60);
  const seconds = +secondsRemaining % 60;
  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({
          type: "tick",
          secondsRemaining: +secondsRemaining,
        });
      }, 1000);

      // clear the return value
      return function () {
        clearInterval(id);
      };
    },
    [dispatch, secondsRemaining]
  );
  return (
    <div>
      {mins < 10 ? "0" : ""}
      {mins}:{seconds < 10 ? "0" : ""}
      {seconds}
    </div>
  );
}

export default Timer;
