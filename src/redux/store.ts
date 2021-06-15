import { combineReducers, createStore } from "redux";
import { ModalReducer } from "./modal/modal.reducer";
import { ThoughtReducer } from "./thought/thought.reducer";
import { AlertReducer } from "./alerts/alert.reducer";
import { ThoughtsReducer } from "./displayThoughts/thoughts.reducer";
import { LoadingReducer } from "./loading/loading.reducer";
// ROOT REDUCER
const Reducers = combineReducers({
  ModalReducer,
  ThoughtReducer,
  AlertReducer,
  ThoughtsReducer,
  LoadingReducer,
});

//STORE
export const store = createStore(
  Reducers,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__({
      trace: true,
    })
);

export type State = ReturnType<typeof Reducers>;
