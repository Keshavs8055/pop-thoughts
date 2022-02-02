interface IState {
  displayName: string;
}

interface IAction {
  type: "SET_DISPLAY_NAME";
  payload: string;
}

const INITIAL_STATE: IState = {
  displayName: "",
};

export const NameReducer = (state: IState = INITIAL_STATE, action: IAction) => {
  switch (action.type) {
    case "SET_DISPLAY_NAME":
      return {
        ...state,
        displayName: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
};
