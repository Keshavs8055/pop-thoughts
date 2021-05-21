interface UserState {
  user: object;
}
type Action = {
  type: string;
  payload: object;
};
const INITIAL_STATE = {
  user: {
    exist: false,
  },
};

export const userReducer = (
  state: UserState = INITIAL_STATE,
  action: Action
) => {
  switch (action.type) {
    case "UPDATE":
      return {
        ...state,
        user: {
          exist: true,
        },
      };

    default:
      return {
        ...state,
      };
  }
};
