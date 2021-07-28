import { store } from "../store";

export interface ILoading {
  loading: boolean;
  loginLoading: boolean;
}
export interface ILoadingAction {
  type: "SET_LOADING" | "DISABLE_LOADING";
}
export const INITIAL_STATE: ILoading = {
  loading: false,
  loginLoading: false,
};

export const loadingDispatch = (v: "START" | "DISABLE") => {
  const dispatch = store.dispatch;
  switch (v) {
    case "START":
      dispatch({
        type: "SET_LOADING",
      });
      break;
    case "DISABLE":
      dispatch({
        type: "DISABLE_LOADING",
      });
      break;
    default:
      break;
  }
};
