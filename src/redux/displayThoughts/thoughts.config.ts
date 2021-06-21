import { IPost } from "../../components/card/card";

export interface IThoughtsState {
  displayThoughts: Array<IPost>;
}
export interface IThoughtsAction {
  type: "FECTH_NEW" | "NEW_THOUGHT_ADDED";
  payload: Array<IPost>;
}
export const INITIAL_STATE: IThoughtsState = {
  displayThoughts: [],
};
