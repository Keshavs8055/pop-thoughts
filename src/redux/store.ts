import { combineReducers, createStore } from "redux";
import { ModalReducer } from "./modal/modal.reducer";
import { ThoughtReducer } from "./thought/thought.reducer";
import { ErrorReducer } from "./error/err.reducer";

// ROOT REDUCER
const Reducers = combineReducers({
  ModalReducer,
  ThoughtReducer,
  ErrorReducer,
});

//STORE
export const store = createStore(
  Reducers,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

export type State = ReturnType<typeof Reducers>;
