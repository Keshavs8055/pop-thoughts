export interface IUserState {
  fullName: string;
  email: string;
  _id: string;
  exist?: boolean;
}
export interface IUserAction {
  type: "SET_USER";
  payload: IUserState;
}
export const INITIAL_STATE: IUserState = {
  fullName: "",
  email: "",
  _id: "",
  exist: false,
};
