import { store } from "../../redux/store";
import { loadingDispatch } from "../../redux/loading/loading.config";

const { dispatch } = store;

export const RequestErrorHandler = (msg: string) => {
  dispatch({
    type: "SET_NEW_ALERT",
    payload: {
      message: msg,
      display: true,
      type: 0,
    },
  });

  loadingDispatch("DISABLE");
};
