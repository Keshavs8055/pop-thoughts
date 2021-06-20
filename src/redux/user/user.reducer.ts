import { Types } from "../types";
import { INITIAL_STATE, IUserAction, IUserState } from "./user.config";

export const UserReducer = (
  state: IUserState = INITIAL_STATE,
  action: IUserAction
) => {
  switch (action.type) {
    case Types.userTypes.SIGN_UP:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};
