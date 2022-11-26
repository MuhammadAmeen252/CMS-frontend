import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import CssBaseline from "@mui/material/CssBaseline";
import App from "./components/app/component";
import store from "./redux/store";
import { Provider } from "react-redux";
import Themes from "./themes";
import { ThemeProvider } from "@mui/material/styles";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //   
  <ThemeProvider theme={Themes.default}>
    {/* Redux store provider for managing state throughout app components */}
    <Provider store={store}>
      <CssBaseline />
      <App />
    </Provider>
  </ThemeProvider>
);
