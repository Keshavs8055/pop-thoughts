import { store } from "../../../../redux/store";
import { Types } from "../../../../redux/types";

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
          type: Types.alertTypes.SET_NEW_ALERT,
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
          type: Types.alertTypes.SET_NEW_ALERT,
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
  console.log("LOGIN", data);

  checkForValues(data, "login");
};
// HANDLE SIGNUP
export const handleSignUpSubmit = (data: IFormHandlers) => {
  checkForValues(data, "signup");
};
