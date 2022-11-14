import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import CssBaseline from '@mui/material/CssBaseline';
import App from "./components/app/component";
import Themes from "./themes";
import { ThemeProvider } from "@mui/material/styles";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={Themes.default}>
    <CssBaseline />
    <App />
  </ThemeProvider>
);