import { loadingDispatch } from "../../../../redux/loading/loading.config";
import { store } from "../../../../redux/store";
import { IFormHandlers } from "../../../../utils/interfaces";
import { checkError } from "../../../../utils/requests/errorHandler";
import {
  forgotPasswordReq,
  UserLogin,
  UserSignUp,
} from "../../../../utils/requests/user.reqs";

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
        return false;
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
        return false;
      }
      break;
  }
  return true;
};
const dispatch = store.dispatch;

// HANDLE LOGIN
export const handleLoginSubmit = (data: IFormHandlers) => {
  loadingDispatch("START");
  checkForValues(data, "login");

  UserLogin({
    email: data.email,
    password: data.password,
    rememberMe: data.rememberMe,
  });
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
// HANDLE FORGOT PASSWORD
export const handleForgotClick = (email: string) => {
  const dispatch = store.dispatch;
  loadingDispatch("START");
  if (email.length < 0 || !email) {
    dispatch({
      type: "SET_NEW_ALERT",
      payload: {
        message: "Please Fill In The Email Feild To Proceed",
        display: true,
        type: 0,
      },
    });
    loadingDispatch("DISABLE");
    return;
  }
  forgotPasswordReq(email)
    .then((res) => {
      dispatch({
        type: "SET_NEW_ALERT",
        payload: {
          message: res.message || "Check Your Email For A Reset Password Link",
          display: true,
          type: 1,
        },
      });
      loadingDispatch("DISABLE");
    })
    .catch((e) => {
      checkError(e);
      loadingDispatch("DISABLE");
    });
};
