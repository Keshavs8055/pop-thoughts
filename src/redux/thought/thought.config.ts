export interface IThoughtState {
  content: string;
}
export interface IThoughtAction {
  type: "UPDATE_CONTENT";
  payload: string;
}
// INITIAL STATE
export const INITIAL_STATE: IThoughtState = {
  content: "",
};
