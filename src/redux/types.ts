export const Types = {
  //ALL MODALS
  modalTypes: {
    TOGGLE_LOGIN_MODAL: "TOGGLE_LOGIN_MODAL",
    TOGGLE_PROFILE_MODAL: "TOGGLE_PROFILE_MODAL",
    CLOSE_ALL: "CLOSE_ALL",
    TOGGLE_THOUGHT_MODAL: "TOGGLE_THOUGHT_MODAL",
  },
};
export interface IAction {
  type: string;
  payload?: object;
}
