import { Types } from "../types";
import { INITIAL_STATE, IThoughtState, IThoughtAction } from "./thought.config";

export const ThoughtReducer = (
  state: IThoughtState = INITIAL_STATE,
  action: IThoughtAction
) => {
  switch (action.type) {
    case Types.thoughtTypes.UPDATE_CONTENT:
      return {
        ...state,
        content: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
};
