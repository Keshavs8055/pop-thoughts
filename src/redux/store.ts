import { combineReducers, createStore } from "redux";
import { ModalReducer } from "./modal/modal.reducer";
import { ThoughtReducer } from "./thought/thought.reducer";
import { AlertReducer } from "./alerts/alert.reducer";
import { ThoughtsReducer } from "./displayThoughts/thoughts.reducer";
import { LoadingReducer } from "./loading/loading.reducer";
import { ThoughtToDisplay } from "./thoughtToDisplay/display.reducer";
import { UserReducer } from "./user/user.reducer";
import { NameReducer } from "./name/name";
// ROOT REDUCER
const Reducers = combineReducers({
  ModalReducer,
  ThoughtReducer,
  AlertReducer,
  ThoughtsReducer,
  LoadingReducer,
  ThoughtToDisplay,
  UserReducer,
  NameReducer,
});

//STORE
export const store = createStore(Reducers);

export type State = ReturnType<typeof Reducers>;
