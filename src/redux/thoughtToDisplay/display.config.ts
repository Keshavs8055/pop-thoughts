import { IThought } from "../../utils/interfaces";

export const INITIAL_STATE: IThought = {
  author: "",
  content: "",
  id: "",
  trimmed: "",
};
export interface IThoughtAction {
  type: "SET_THOUGHT_TO_DISPLAY";
  payload: IThought;
}
