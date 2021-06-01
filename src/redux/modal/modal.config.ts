import { Dispatch } from "redux";
import { IAction } from "../types";

export interface IModalState {
  loginModal: boolean;
  profileModal: boolean;
  thoughtModal: boolean;
}

export const ModalAction = (action: IAction) => {
  return (dispatch: Dispatch) => {
    dispatch(action);
  };
};
