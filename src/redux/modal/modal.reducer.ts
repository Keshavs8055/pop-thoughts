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
      };
    case Types.modalTypes.TOGGLE_PROFILE_MODAL:
      return {
        ...state,
        profileModal: !state.profileModal,
      };
    case Types.modalTypes.TOGGLE_THOUGHT_MODAL:
      return {
        ...state,
        thoughtModal: !state.thoughtModal,
      };
    case Types.modalTypes.SET_THOUGHT_EDIT:
      return {
        ...state,
        thoughtModal: !state.thoughtModal,
        editModeThought: true,
      };
    case Types.modalTypes.CLOSE_ALL:
      return {
        ...state,
        profileModal: false,
        loginModal: false,
        thoughtModal: false,
        editModeThought: false,
        displayThoughtModal: false,
      };
    case "DISPLAY_THOUGHT":
      return {
        ...state,
        displayThoughtModal: true,
      };
    default:
      return {
        ...state,
      };
  }
};
