export interface ICustomAlert {
  message: string;
  type: 0 | 1;
  display: boolean;
}
export interface IAlertAction {
  type: string;
  payload: {
    message: string;
    type: 0 | 1;
    display: boolean;
  };
}

export const INITIAL_STATE: ICustomAlert = {
  message: "",
  type: 0,
  display: false,
};
