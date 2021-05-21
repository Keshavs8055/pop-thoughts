import { ModalTypes } from "./modal.action";
import { IAction } from "./modal.action";
import { IModalState } from "./modal.action";

const INITIAL_STATE = {
  loginModal: false,
};

export const ModalReducer = (
  state: IModalState = INITIAL_STATE,
  action: IAction
) => {
  switch (action.type) {
    case ModalTypes.TOGGLE_LOGIN_MODAL:
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
