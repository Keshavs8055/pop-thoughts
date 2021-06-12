export interface ICustomError {
  display: boolean;
  message: string;
}
export interface IErrorAction {
  type: string;
  payload: string;
}

export const INITIAL_STATE = {
  display: false,
  message: "",
};
