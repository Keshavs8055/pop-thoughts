import { Types } from "../types";
import {
  INITIAL_STATE,
  IThoughtsAction,
  IThoughtsState,
} from "./thoughts.config";

export const ThoughtsReducer = (
  state: IThoughtsState = INITIAL_STATE,
  action: IThoughtsAction
) => {
  switch (action.type) {
    case Types.thoughts.FECTH_NEW:
      return {
        ...state,
        displayThoughts: [...state.displayThoughts, ...action.payload],
      };
    case Types.displayTypes.NEW_THOUGHT_ADDED:
      return {
        ...state,
        displayThoughts: [...action.payload, ...state.displayThoughts],
      };
    case Types.displayTypes.DISPLAY_USER_THOUGHTS:
      return {
        ...state,
        userDisplayThoughts: [...action.payload],
      };
    default:
      return {
        ...state,
      };
  }
};
