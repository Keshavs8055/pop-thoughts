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
        displayThoughts: [...state.displayThoughts, ...action.payload],
      };
    case Types.displayTypes.NEW_THOUGHT_ADDED:
      return {
        displayThoughts: [...action.payload, ...state.displayThoughts],
      };
    default:
      return {
        ...state,
      };
  }
};
