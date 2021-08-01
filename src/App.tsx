import { Box, Container, ThemeProvider } from "@material-ui/core";
import React from "react";
import Homepage from "./pages/Homepage/homepage";
import { Modals } from "./components/modals/modals";
import { DarkTheme, Theme } from "./utils/theme";
import { CustomAppBar } from "./components/AppBar/appbar";
import { AlertComponent } from "./components/Alert/AlertComponent";

let t = "light";
export const getCookie = (key: string) => {
  console.log(document.cookie);
  console.log(
    document.cookie.replace(/(?:(?:^|.*;\s*)jwt\s*=\s*([^;]*).*$)|^.*$/, "$1")
  );

  var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
  return b ? b.pop() : "";
};
console.log(getCookie("jwt"));

function App() {
  return (
    <ThemeProvider theme={t === "dark" ? DarkTheme : Theme}>
      <CustomAppBar variant="NavBar" />
      <Container>
        <Box my={1}>
          <Homepage />
          <Modals />
          <AlertComponent />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
