import { Dialog, Slide } from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions/transition";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../redux/store";
import { Types } from "../../redux/types";
import { LoginModal } from "./loginModal/loginModal";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export const Modals = () => {
  const state = useSelector((state: State) => state.ModalReducer);
  const { loginModal } = state;
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch({ type: Types.modalTypes.TOGGLE_LOGIN_MODAL });
    return true;
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={loginModal}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        {loginModal ? <LoginModal closeFunction={handleClose} /> : null}
      </Dialog>
    </div>
  );
};
