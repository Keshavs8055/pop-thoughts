import { Dispatch } from "redux";

export const ModalTypes = {
  TOGGLE_LOGIN_MODAL: "TOGGLE_LOGIN_MODAL",
};
export interface IModalState {
  loginModal: boolean;
}

export interface IAction {
  type: string;
}
export const ModalAction = (action: IAction) => {
  return (dispatch: Dispatch) => {
    dispatch(action);
  };
};
