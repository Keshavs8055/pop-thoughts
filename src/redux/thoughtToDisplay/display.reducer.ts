import { IPost } from "../../components/card/card";
import { Types } from "../types";
import { IThoughtAction, INITIAL_STATE } from "./display.config";

export const ThoughtToDisplay = (
  state: IPost = INITIAL_STATE,
  action: IThoughtAction
) => {
  switch (action.type) {
    case Types.displayTypes.SET_THOUGHT_TO_DISPLAY:
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
