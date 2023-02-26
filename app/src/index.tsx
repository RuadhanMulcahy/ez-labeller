import React from "react";
import ReactDOM from "react-dom/client";
import ImageLabeler from "./components/ImageLabeler/ImageLabeler";
// import ImageLabeler from "./components/ImageLabeler";
// import { ImageProvider } from "./contexts/ImageLabelerContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ImageLabeler />
  </React.StrictMode>
);
