import { Types } from "../types";
import { INITIAL_STATE, IUserAction, IUserState } from "./user.config";

export const UserReducer = (
  state: IUserState = INITIAL_STATE,
  action: IUserAction
) => {
  switch (action.type) {
    case Types.userTypes.SIGN_UP:
      console.log("IN SIGN_UP", action.payload);

      return {
        ...state,
        ...action.payload,
        exist: true,
      };
    default:
      return {
        ...state,
      };
  }
};
