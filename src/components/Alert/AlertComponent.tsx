import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../redux/store";
import { Types } from "../../redux/types";

export const AlertComponent = () => {
  const { display, message, type } = useSelector(
    (state: State) => state.AlertReducer
  );
  const dispatch = useDispatch();

  return (
    <Snackbar
      open={display || false}
      onClose={() => {
        dispatch({
          type: Types.alertTypes.SET_NEW_ALERT,
          payload: { display: false, message: message, type: type },
        });
      }}
      autoHideDuration={6000}
    >
      <Alert
        elevation={6}
        variant="filled"
        severity={type === 0 ? "error" : "success"}
        onClose={() => {
          dispatch({
            type: Types.alertTypes.SET_NEW_ALERT,
            payload: { display: false, message: message, type: type },
          });
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};
