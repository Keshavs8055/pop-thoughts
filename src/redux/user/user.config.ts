export interface IUserState {
  fullName: string;
  email: string;
  _id: string;
  exist: boolean;
}
export interface IUserAction {
  type: "SIGNUP_USER" | "LOGIN_USER";
  payload: {};
}
export const INITIAL_STATE: IUserState = {
  fullName: "",
  email: "",
  _id: "",
  exist: false,
};
