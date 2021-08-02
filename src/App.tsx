import { Box, Container, ThemeProvider } from "@material-ui/core";
import React, { useEffect } from "react";
import Homepage from "./pages/Homepage/homepage";
import { Modals } from "./components/modals/modals";
import { Theme } from "./utils/theme";
import { CustomAppBar } from "./components/AppBar/appbar";
import { AlertComponent } from "./components/Alert/AlertComponent";
import { verify } from "jsonwebtoken";
import { getUser } from "./utils/requests/user.reqs";
import { IUserState } from "./redux/user/user.config";
import { UserReduxAction } from "./redux/actions.dispatch";
import { RequestErrorHandler } from "./utils/requests/errorHandler";
import { loadingDispatch } from "./redux/loading/loading.config";

export const checkUserStatus = () => {
  loadingDispatch("START");
  const token = localStorage.getItem("jwt");

  if (!token) {
    loadingDispatch("DISABLE");
    return;
  }
  const decoded: any = verify(
    token,
    process.env.REACT_APP_JWT_SECRET as string
  );
  const userId = decoded.id;
  getUser(userId, token)
    .then((user: IUserState) => {
      UserReduxAction(
        {
          fullName: user.fullName,
          _id: user._id,
          email: user.email,
          exist: true,
        },
        "Login"
      );
    })
    .catch((e) => {
      console.log(e);
      RequestErrorHandler(e.response.data.message);
    });
};

function App() {
  useEffect(() => {
    checkUserStatus();
  });
  return (
    <ThemeProvider theme={Theme}>
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
