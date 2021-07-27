export interface ILoading {
  loading: boolean;
  loginLoading: boolean;
}
export interface ILoadingAction {
  type:
    | "SET_LOADING"
    | "DISABLE_LOADING"
    | "LOGIN_LOADING"
    | "DISABLE_LOGIN_LOADING";
}
export const INITIAL_STATE: ILoading = {
  loading: false,
  loginLoading: false,
};
