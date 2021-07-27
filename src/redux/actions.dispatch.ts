import { store } from "./store";
import { IUserState } from "./user/user.config";

const dispatch = store.dispatch;
export const UserReduxAction = (
  payload: IUserState,
  variant: "Login" | "Signup"
) => {
  dispatch({
    type: "SET_USER",
    payload: {
      fullName: payload.fullName,
      _id: payload._id,
      email: payload.email,
      exist: true,
    },
  });
  dispatch({
    type: "SET_NEW_ALERT",
    payload: {
      display: true,
      message:
        variant === "Login"
          ? "Successfully Signed In"
          : "Successfully Signed Up",
      type: 1,
    },
  });
  dispatch({
    type: "CLOSE_ALL",
  });
  dispatch({
    type: "DISABLE_LOADING",
  });
};
