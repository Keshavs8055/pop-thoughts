import { createMuiTheme, ThemeOptions } from "@material-ui/core/styles";

export const DarkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#00c853",
      contrastText: "#fff",
    },
    background: {
      default: "#212121",
      paper: "#212121",
    },
  },
});

export const Theme = createMuiTheme({
  palette: {
    // type: "dark",
    // primary: {
    //   main: "#000000",
    // },
    // secondary: {
    //   main: "#00c853",
    //   contrastText: "#fff",
    // },
    // background: {
    //   default: "#212121",
    //   paper: "#212121",
    // },
    type: "dark",
    primary: {
      main: "#436228",
    },
    secondary: {
      main: "#ECBA3D",
      contrastText: "#436228",
    },
    background: {
      paper: "#0a0a0a",
      default: "#0a0a0a",
    },
    text: {
      secondary: "rgba(255,255,255,0.7)",
    },
  },
} as ThemeOptions);
