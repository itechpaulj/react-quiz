import React from "react";
import ReactDOM from "react-dom/client";
import "./components/style/index.css";
import App from "./App";

import { QuizContext } from "./contexts/QuizContext";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <QuizContext>
      <App />
    </QuizContext>
  </React.StrictMode>
);
