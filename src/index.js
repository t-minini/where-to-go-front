import "./index.css";
import App from "./App";
import React from "react";
import "antd/dist/antd.min.css";
import { hydrate, render } from "react-dom";
import { BrowserRouter } from "react-router-dom";

const APP = () => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
};

const rootElement = document.getElementById("root");
if (rootElement.hasChildNodes()) {
  hydrate(<APP />, rootElement);
} else {
  render(<APP />, rootElement);
}
