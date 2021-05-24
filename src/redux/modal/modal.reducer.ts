import { IAction, IModalState, ModalTypes } from "./modal.config";

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
