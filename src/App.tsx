import { Grid, ThemeProvider } from "@material-ui/core";
import React from "react";
import NavBar from "./components/Nav/Nav";
import Homepage from "./pages/Homepage/homepage";
import { Modals } from "./components/modals/modals";
import { Theme } from "./theme";

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <Grid container>
        <NavBar />
        <Homepage />
        <Modals />
      </Grid>
    </ThemeProvider>
  );
}

export default App;
