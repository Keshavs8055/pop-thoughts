import { IAction, Types } from "../types";
import { IModalState } from "./modal.config";

const INITIAL_STATE = {
  loginModal: false,
};

export const ModalReducer = (
  state: IModalState = INITIAL_STATE,
  action: IAction
) => {
  switch (action.type) {
    case Types.modalTypes.TOGGLE_LOGIN_MODAL:
      return {
        ...state,
        loginModal: !state.loginModal,
      };

    default:
      return {
        ...state,
      };
  }
};
