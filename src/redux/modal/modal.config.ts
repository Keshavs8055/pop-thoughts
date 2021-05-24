import { Dispatch } from "redux";
import { IAction } from "../types";

export interface IModalState {
  loginModal: boolean;
}

export const ModalAction = (action: IAction) => {
  return (dispatch: Dispatch) => {
    dispatch(action);
  };
};
