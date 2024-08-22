import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const rootContainer = document.getElementById("root") as HTMLElement;
ReactDOM.createRoot(rootContainer).render(
  <React.StrictMode>
    <App />
    <ToastContainer />
  </React.StrictMode>
);
