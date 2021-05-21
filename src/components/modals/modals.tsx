import { Dialog, Slide } from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions/transition";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ModalTypes } from "../../redux/modal/modal.action";
import { State } from "../../redux/store";
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
    dispatch({ type: ModalTypes.TOGGLE_LOGIN_MODAL });
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
