import { Box, Container, Grid, ThemeProvider } from "@material-ui/core";
import React from "react";
import Homepage from "./pages/Homepage/homepage";
import { Modals } from "./components/modals/modals";
import { DarkTheme, Theme } from "./theme";
import { CustomAppBar } from "./components/AppBar/appbar";
import { AlertComponent } from "./components/Alert/AlertComponent";

let t = "light";

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
