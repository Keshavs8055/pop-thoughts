export interface IThoughtState {
  content: string;
  title: string;
}
export interface IThoughtAction {
  type: string;
  payload: string;
}
// INITIAL STATE
export const INITIAL_STATE = {
  title: "",
  content: "",
};
