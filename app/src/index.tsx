import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import ImageLabeler from "./components/ImageLabeller";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ImageLabeler />
  </React.StrictMode>
);
