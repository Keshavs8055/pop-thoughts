import { Types } from "../types";
import { IModalState, INITIAL_STATE, IModalAction } from "./modal.config";

export const ModalReducer = (
  state: IModalState = INITIAL_STATE,
  action: IModalAction
) => {
  switch (action.type) {
    case Types.modalTypes.TOGGLE_LOGIN_MODAL:
      return {
        ...state,
        loginModal: !state.loginModal,
        profileModal: false,
        thoughtModal: false,
      };
    case Types.modalTypes.TOGGLE_PROFILE_MODAL:
      return {
        ...state,
        profileModal: !state.profileModal,
        loginModal: false,
        thoughtModal: false,
      };
    case Types.modalTypes.TOGGLE_THOUGHT_MODAL:
      return {
        ...state,
        profileModal: false,
        loginModal: false,
        thoughtModal: !state.thoughtModal,
      };
    case Types.modalTypes.CLOSE_ALL:
      return {
        ...state,
        profileModal: false,
        loginModal: false,
        thoughtModal: false,
      };
    default:
      return {
        ...state,
      };
  }
};
