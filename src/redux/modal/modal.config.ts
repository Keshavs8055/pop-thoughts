export interface IModalState {
  loginModal: boolean;
  profileModal: boolean;
  thoughtModal: boolean;
}
export interface IModalAction {
  type: string;
}
// INITIAL STATE
export const INITIAL_STATE = {
  loginModal: false,
  profileModal: false,
  thoughtModal: false,
};
