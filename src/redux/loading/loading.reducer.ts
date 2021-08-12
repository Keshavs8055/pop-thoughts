import { Types } from "../types";
import { ILoading, ILoadingAction } from "./loading.config";

export const INITIAL_STATE: ILoading = {
  loading: false,
  loginLoading: false,
};

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
