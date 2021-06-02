import { Types } from "../types";
import { IThoughtState } from "./thought.config";
const INITIAL_STATE = {
  title: "",
  content: "",
};
interface ThoughtAction {
  type: string;
  payload: string;
}
export const ThoughtReducer = (
  state: IThoughtState = INITIAL_STATE,
  action: ThoughtAction
) => {
  switch (action.type) {
    case Types.thoughtTypes.UPDATE_CONTENT:
      return {
        ...state,
        content: action.payload,
      };
    case Types.thoughtTypes.UPDATE_TITLE:
      return {
        ...state,
        title: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};
