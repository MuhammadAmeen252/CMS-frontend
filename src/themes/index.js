import palette from "./palette";
import typography from "./typography";
import breakpoints from "./breakpoints";
import font from "./font";
import body from "./body";

import { createTheme } from "@mui/material/styles";

const myTheme = {
  palette,
  typography,
  breakpoints,
  screenPadding:50,
  components: {
    MuiCssBaseline: {
      styleOverrides:{
        "@font-face": [font],
        body,
      }
    },
  }
};
export default {
  default: createTheme(myTheme),
};
