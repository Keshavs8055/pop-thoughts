import { auth } from "../../../../firebase/firebase";
import { loadingDispatch } from "../../../../redux/loading/loading.config";
import { store } from "../../../../redux/store";
import { IFormHandlers } from "../../../../utils/interfaces";
import { createUserDoc } from "../../../../firebase/firebase";

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
        return false;
      }
      break;
  }
  loadingDispatch("DISABLE");
  return true;
};

// HANDLE LOGIN
export const handleLoginSubmit = async (data: IFormHandlers) => {
  loadingDispatch("START");

  const dispatch = store.dispatch;
  let dataOk = checkForValues(data, "login");
  if (!dataOk) return;

  auth.signInWithEmailAndPassword(data.email, data.password).catch((e) => {
    console.log({ ...e });
    let msg;
    if (e.code === "auth/user-not-found") {
      msg = "No User Found, Try Signing Up";
    }
    if (e.code === "auth/wrong-password") {
      msg = "Make Sure The Password Is Correct.";
    }
    dispatch({
      type: "SET_NEW_ALERT",
      payload: {
        message: msg ? msg : "An Unknown Error Occurred, Please Try Again.",
        display: true,
        type: 0,
      },
    });
  });
  loadingDispatch("DISABLE");
};
// HANDLE SIGNUP
export const handleSignUpSubmit = async (data: IFormHandlers) => {
  loadingDispatch("START");

  const dispatch = store.dispatch;
  let dataOk = checkForValues(data, "signup");
  if (!dataOk) return;

  auth
    .createUserWithEmailAndPassword(data.email, data.password)
    .then(({ user }) => {
      if (!user) return;
      createUserDoc(user, data.fullName);
      loadingDispatch("DISABLE");
    })
    .catch((e) => {
      dispatch({
        type: "SET_NEW_ALERT",
        payload: {
          message:
            e.code === "auth/email-already-in-use"
              ? "Email ALready In Use, Try Logging In"
              : "An Unknown Error Occurred, Please Try Again.",
          display: true,
          type: 0,
        },
      });
      loadingDispatch("DISABLE");
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
  auth
    .sendPasswordResetEmail(email)
    .then(() => {
      dispatch({
        type: "SET_NEW_ALERT",
        payload: {
          message: "Check Your Mail To Change Your Password",
          display: true,
          type: 1,
        },
      });
    })
    .catch((e) => {
      console.log({ ...e });
      let msg;
      if (e.code === "auth/user-not-found") {
        msg = "No User With This Email, Try Signing Up";
      }

      dispatch({
        type: "SET_NEW_ALERT",
        payload: {
          message: msg ? msg : "Please Try Later.",
          display: true,
          type: 0,
        },
      });
    });
  loadingDispatch("DISABLE");
};
