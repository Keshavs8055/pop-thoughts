export const Types = {
  //ALL MODALS
  modalTypes: {
    TOGGLE_LOGIN_MODAL: "TOGGLE_LOGIN_MODAL",
    TOGGLE_PROFILE_MODAL: "TOGGLE_PROFILE_MODAL",
    CLOSE_ALL: "CLOSE_ALL",
    TOGGLE_THOUGHT_MODAL: "TOGGLE_THOUGHT_MODAL",
  },
  thoughtTypes: {
    UPDATE_TITLE: "UPDATE_TITLE",
    UPDATE_CONTENT: "UPDATE_CONTENT",
  },
};
export interface IAction {
  type: string;
  payload?: object;
}
