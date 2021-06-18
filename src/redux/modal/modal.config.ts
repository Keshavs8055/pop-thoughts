export interface IModalState {
  loginModal: boolean;
  profileModal: boolean;
  thoughtModal: boolean;
  editModeThought: boolean;
  displayThoughtModal: boolean;
}
export type IModalAction = {
  type:
    | "TOGGLE_LOGIN_MODAL"
    | "TOGGLE_PROFILE_MODAL"
    | "CLOSE_ALL"
    | "TOGGLE_THOUGHT_MODAL"
    | "SET_THOUGHT_EDIT"
    | "DISPLAY_THOUGHT";
};
// INITIAL STATE
export const INITIAL_STATE: IModalState = {
  loginModal: false,
  profileModal: false,
  thoughtModal: false,
  editModeThought: false,
  displayThoughtModal: false,
};
