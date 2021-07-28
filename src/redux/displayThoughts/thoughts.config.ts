import { IThought } from "../../utils/interfaces";

export interface IThoughtsState {
  displayThoughts: Array<IThought>;
  userDisplayThoughts: Array<IThought>;
}
export interface IThoughtsAction {
  type: "FECTH_NEW" | "NEW_THOUGHT_ADDED" | "DISPLAY_USER_THOUGHTS";
  payload: Array<IThought>;
}
export const INITIAL_STATE: IThoughtsState = {
  displayThoughts: [],
  userDisplayThoughts: [],
};
