import { Box } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../redux/store";
import { Types } from "../../redux/types";
import { AlertStyles } from "../classes";

export const AlertComponent = () => {
  const state = useSelector((state: State) => state.AlertReducer);
  const dispatch = useDispatch();
  const classes = AlertStyles();
  if (state.display && state.message.length > 0) {
    return (
      <Box position="fixed" className={classes.root}>
        <Alert
          variant="filled"
          severity={state.type === 0 ? "error" : "success"}
          onClose={() => {
            dispatch({
              type: Types.alertTypes.SET_NEW_ALERT,
              payload: { display: false },
            });
          }}
        >
          {state.message}
        </Alert>
      </Box>
    );
  }
  return null;
};
