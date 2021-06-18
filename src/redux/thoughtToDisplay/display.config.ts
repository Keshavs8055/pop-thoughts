import { IPost } from "../../components/card/card";

export const INITIAL_STATE: IPost = {
  author: "",
  content: "",
  id: "",
  title: "",
  trimmed: "",
};
export interface IThoughtAction {
  type: "SET_THOUGHT_TO_DISPLAY";
  payload: IPost;
}
