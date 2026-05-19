import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import SwipeLP from "./SwipeLP.jsx";

const isLP = window.location.pathname.startsWith("/lp");

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {isLP ? <SwipeLP /> : <App />}
  </StrictMode>
);
