import { Types } from "../types";
import { ICustomError, IErrorAction, INITIAL_STATE } from "./err.config";

export const ErrorReducer = (
  state: ICustomError = INITIAL_STATE,
  action: IErrorAction
) => {
  switch (action.type) {
    case Types.errorTypes.SET_NEW_ERROR:
      return {
        ...state,
        display: true,
        message: action.payload,
      };
    default:
      return {
        ...state,
        display: false,
        message: "",
      };
  }
};
