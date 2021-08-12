import { Box, Container, ThemeProvider } from "@material-ui/core";
import { useEffect } from "react";
import Homepage from "./pages/Homepage/homepage";
import { Modals } from "./components/modals/modals";
import { Theme } from "./utils/theme";
import { CustomAppBar } from "./components/AppBar/appbar";
import { AlertComponent } from "./components/Alert/AlertComponent";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ForgotPasswordPage } from "./pages/forgotPassword/forgotPasswordForm";
import { setUserStatus } from "./utils/requests/user.reqs";

function App() {
  useEffect(() => {
    setUserStatus(localStorage.getItem("jwt"));
  });
  return (
    <ThemeProvider theme={Theme}>
      <Router>
        <Switch>
          <Route path="/forgotpassword">
            <ForgotPasswordPage />
          </Route>
          <Route path="/">
            <CustomAppBar variant="NavBar" />
            <Container>
              <Box my={1}>
                <Homepage />
                <Modals />
              </Box>
            </Container>
          </Route>
        </Switch>
      </Router>
      <AlertComponent />
    </ThemeProvider>
  );
}

export default App;
