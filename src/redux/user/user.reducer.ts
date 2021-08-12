import { Types } from "../types";
import { INITIAL_STATE, IUserAction, IUserState } from "./user.config";

export const UserReducer = (
  state: IUserState = INITIAL_STATE,
  action: IUserAction
) => {
  switch (action.type) {
    case Types.userTypes.SET_USER:
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
