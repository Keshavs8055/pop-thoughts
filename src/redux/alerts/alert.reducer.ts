import { Types } from "../types";
import { IAlertAction, ICustomState, INITIAL_STATE } from "./alert.config";

export const AlertReducer = (
  state: ICustomState = INITIAL_STATE,
  action: IAlertAction
) => {
  switch (action.type) {
    case Types.alertTypes.SET_NEW_ALERT:
      return {
        ...state,
        display: action.payload.display,
        message: action.payload.message,
        type: action.payload.type,
      };

    default:
      return {
        ...state,
      };
  }
};
