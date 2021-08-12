import { store } from "../../redux/store";
import { loadingDispatch } from "../../redux/loading/loading.config";

const { dispatch } = store;

export const checkError = (error: any) => {
  if (error.response) {
    RequestErrorHandler(error.response.data.message);
  } else {
    RequestErrorHandler("An Unknown Error Ocurred, please try later.");
  }
  console.log(error.config);
};

export const RequestErrorHandler = (msg: string) => {
  let message = msg.length > 0 ? msg : "An Unexpected Error Ocurred.";
  dispatch({
    type: "SET_NEW_ALERT",
    payload: {
      message: message,
      display: true,
      type: 0,
    },
  });

  loadingDispatch("DISABLE");
};
