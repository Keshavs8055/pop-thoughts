export interface ICustomState {
  message: string;
  type: 0 | 1; // 0 = error
  display: boolean;
}
export interface IAlertAction {
  type: "SET_NEW_ALERT";
  payload: {
    message: string;
    type: 0 | 1;
    display: boolean;
  };
}

export const INITIAL_STATE: ICustomState = {
  message: "",
  type: 0,
  display: false,
};
