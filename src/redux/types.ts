export const Types = {
  //ALL MODALS
  modalTypes: {
    TOGGLE_LOGIN_MODAL: "TOGGLE_LOGIN_MODAL",
  },
};
export interface IAction {
  type: string;
  payload?: object;
}
