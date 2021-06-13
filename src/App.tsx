import { Grid, ThemeProvider } from "@material-ui/core";
import React from "react";
import Homepage from "./pages/Homepage/homepage";
import { Modals } from "./components/modals/modals";
import { Theme } from "./theme";
import { CustomAppBar } from "./components/AppBar/appbar";
import { AlertComponent } from "./components/Alert/AlertComponent";

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <Grid container>
        <CustomAppBar variant="NavBar" />
        <Homepage />
        <Modals />
        <AlertComponent />
      </Grid>
    </ThemeProvider>
  );
}

export default App;
