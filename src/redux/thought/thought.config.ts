export interface IThoughtState {
  content: string;
}
export interface IThoughtAction {
  type: "UPDATE_CONTENT" | "SET_THOUGHT_TO_DISPLAY";
  payload: string;
}
// INITIAL STATE
export const INITIAL_STATE: IThoughtState = {
  content: "",
};
