import { store } from "../../../../redux/store";
import { UserLogin, UserSignUp } from "../../../../utils/requests";

// INTERFACE
interface IFormHandlers {
  password: string;
  email: string;
  fullName: "" | string;
  confirmPassword: "" | string;
}
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
        dispatch({ type: "DISABLE_LOADING" });
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
        dispatch({ type: "DISABLE_LOADING" });
      }
      break;
  }
};
const dispatch = store.dispatch;
// HANDLE LOGIN
export const handleLoginSubmit = (data: IFormHandlers) => {
  dispatch({ type: "SET_LOADING" });
  checkForValues(data, "login");
  UserLogin({ email: data.email, password: data.password });
};
// HANDLE SIGNUP
export const handleSignUpSubmit = (data: IFormHandlers) => {
  dispatch({ type: "SET_LOADING" });
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
