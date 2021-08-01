import { Types } from "../types";
import { ILoading, ILoadingAction, INITIAL_STATE } from "./loading.config";

export const LoadingReducer = (
  state: ILoading = INITIAL_STATE,
  action: ILoadingAction
) => {
  switch (action.type) {
    case Types.loading.SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case Types.loading.DISABLE_LOADING:
      return {
        ...state,
        loading: false,
        loginLoading: false,
      };
    default:
      return {
        ...state,
      };
  }
};
