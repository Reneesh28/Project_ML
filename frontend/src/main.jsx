/**
 * @title main
 * @notice Application entry point for SPAE frontend
 * @dev Provides React Router context to the entire app
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

/* -------------------------------------------------------------------------- */
/* Global Styles                                                              */
/* -------------------------------------------------------------------------- */

import "@/index.css";

/* -------------------------------------------------------------------------- */
/* Root Application Component                                                 */
/* -------------------------------------------------------------------------- */

import App from "@/App";

/**
 * @notice Bootstrap React application
 * @dev BrowserRouter MUST wrap App to enable <Link /> navigation
 */
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
