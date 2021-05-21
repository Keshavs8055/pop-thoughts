import { Grid, ThemeProvider } from "@material-ui/core";
import React from "react";
import NavBar from "./components/Nav/Nav";
import Homepage from "./pages/Homepage/homepage";
import { Provider } from "react-redux";

import { Theme } from "./theme";
import { store } from "./redux/store";
import { Modals } from "./components/modals/modals";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={Theme}>
        <Grid container>
          <NavBar />
          <Homepage />
          <Modals />
        </Grid>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
