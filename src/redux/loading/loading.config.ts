export interface ILoading {
  loading: boolean;
}
export interface ILoadingAction {
  type: "SET_LOADING" | "DISABLE_LOADING";
}
export const INITIAL_STATE: ILoading = {
  loading: false,
};
