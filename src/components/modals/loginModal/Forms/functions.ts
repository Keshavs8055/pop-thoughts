import { store } from "../../../../redux/store";
import { UserSignUp } from "../../../../requests";

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
      }
      break;
  }
};
// HANDLE LOGIN
export const handleLoginSubmit = (data: IFormHandlers) => {
  checkForValues(data, "login");
};
// HANDLE SIGNUP
export const handleSignUpSubmit = (data: IFormHandlers) => {
  const dispatch = store.dispatch;
  checkForValues(data, "signup");

  UserSignUp(data).then((res) => {
    if (!res) return;
    const data = { ...res.data.data };
    dispatch({
      type: "CLOSE_ALL",
    });
    dispatch({
      type: "SET_NEW_ALERT",
      payload: {
        display: true,
        message: "signed Up Successfully",
        type: 1,
      },
    });
    dispatch({
      type: "SIGNUP_USER",
      payload: { ...data },
    });
  });
};
