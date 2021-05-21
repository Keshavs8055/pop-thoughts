import { createMuiTheme, ThemeOptions } from "@material-ui/core/styles";

export const Theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#00c853",
    },
    background: {
      default: "#212121",
      paper: "#212121",
    },
  },
} as ThemeOptions);
