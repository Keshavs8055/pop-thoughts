import { loadingDispatch } from "../../../../redux/loading/loading.config";
import { store } from "../../../../redux/store";
import { IFormHandlers } from "../../../../utils/interfaces";
import { UserLogin, UserSignUp } from "../../../../utils/requests";

const checkForValues = (values: IFormHandlers, type: "login" | "signup") => {
  const dispatch = store.dispatch;
  switch (type) {
    case "login":
      if (values.email.length < 1 || values.password.length < 1) {
        dispatch({
          type: "SET_NEW_ALERT",
          payload: {
            message: "Please Fill In All Values",
            display: true,
            type: 0,
          },
        });
        loadingDispatch("DISABLE");
      }
      break;
    case "signup":
      if (
        values.email.length < 1 ||
        values.password.length < 1 ||
        values.confirmPassword.length < 1 ||
        values.fullName.length < 1
      ) {
        dispatch({
          type: "SET_NEW_ALERT",
          payload: {
            message: "Please Fill In All Values",
            display: true,
            type: 0,
          },
        });
        loadingDispatch("DISABLE");
      }
      break;
  }
};
const dispatch = store.dispatch;
// HANDLE LOGIN
export const handleLoginSubmit = (data: IFormHandlers) => {
  loadingDispatch("START");
  checkForValues(data, "login");
  UserLogin({ email: data.email, password: data.password });
};
// HANDLE SIGNUP
export const handleSignUpSubmit = (data: IFormHandlers) => {
  loadingDispatch("START");

  checkForValues(data, "signup");
  UserSignUp(data).then((res) => {
    if (!res) return;

    dispatch({
      type: "CLOSE_ALL",
    });
    dispatch({
      type: "SET_NEW_ALERT",
      payload: {
        display: true,
        message: "Signed Up Successfully",
        type: 1,
      },
    });
  });
};
