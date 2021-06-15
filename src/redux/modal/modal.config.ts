export interface IModalState {
  loginModal: boolean;
  profileModal: boolean;
  thoughtModal: boolean;
  editModeThought: boolean;
}
export interface IModalAction {
  type:
    | "TOGGLE_LOGIN_MODAL"
    | "TOGGLE_PROFILE_MODAL"
    | "CLOSE_ALL"
    | "TOGGLE_THOUGHT_MODAL";
}
// INITIAL STATE
export const INITIAL_STATE: IModalState = {
  loginModal: false,
  profileModal: false,
  thoughtModal: false,
  editModeThought: false,
};
