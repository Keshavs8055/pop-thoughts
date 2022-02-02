import { IThought } from "../../utils/interfaces";

export interface IThoughtsState {
  displayThoughts: Array<IThought>;
}
export interface IThoughtsAction {
  type: "FECTH_NEW" | "NEW_THOUGHT_ADDED";
  payload: IThought[];
}
export const INITIAL_STATE: IThoughtsState = {
  displayThoughts: [],
};
