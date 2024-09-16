import React, { useEffect } from "react";
import { Box, Container, ThemeProvider } from "@material-ui/core";
import Homepage from "./pages/Homepage/homepage";
import { Modals } from "./components/modals/modals";
import { Theme } from "./utils/theme";
import { CustomAppBar } from "./components/AppBar/appbar";
import { AlertComponent } from "./components/Alert/AlertComponent";

import { auth, createUserDoc } from "./firebase/firebase";
import { State, store } from "./redux/store";
import { IUserState } from "./redux/user/user.config";
import { loadingDispatch } from "./redux/loading/loading.config";
import { useSelector } from "react-redux";

const App = () => {
  const dispatch = store.dispatch;
  const displayName = useSelector(
    (state: State) => state.NameReducer.displayName
  );
  useEffect(() => {
    loadingDispatch("START");
    const unsub = auth.onAuthStateChanged(async (u) => {
      if (!u) {
        loadingDispatch("DISABLE");
        return;
      }

      const userRef = await createUserDoc(u, {
        displayName: displayName.length > 0 ? displayName : u.displayName,
      });
      if (userRef) {
        userRef.onSnapshot((snap) => {
          const data = snap.data();
          if (!data) return;

          const user: IUserState = {
            email: data.email,
            fullName: data.displayName,
            _id: snap.id,
            exist: true,
          };
          dispatch({
            type: "SET_USER",
            payload: user,
          });
        });
        loadingDispatch("DISABLE");
      }
      dispatch({ type: "CLOSE_ALL" });
    });
    return unsub;
  }, [dispatch, displayName]);
  return (
    <ThemeProvider theme={Theme}>
      <CustomAppBar variant="NavBar" />
      <Container>
        <Box my={1}>
          <Homepage />
          <Modals />
        </Box>
      </Container>

      <AlertComponent />
    </ThemeProvider>
  );
};

export default App;
