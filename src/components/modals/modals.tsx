import { Dialog, Slide } from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions/transition";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../redux/store";
import { Types } from "../../redux/types";
import { LoginModal } from "./loginModal/loginModal";
import { ProfileModal } from "./ProfileModal/profileModal";
import { ThoughtModal } from "./thoughtModal/thoughtModal";
import { DisplayThought } from "./displayThought/displayThought";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// MODAL EXPORT
export const Modals = () => {
  const state = useSelector((state: State) => state.ModalReducer);
  const { loginModal, profileModal, thoughtModal, displayThoughtModal } = state;
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch({ type: Types.modalTypes.CLOSE_ALL });
    return true;
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={loginModal || profileModal || thoughtModal || displayThoughtModal}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        {loginModal ? <LoginModal closeFunction={handleClose} /> : null}
        {thoughtModal ? <ThoughtModal closeFunction={handleClose} /> : null}
        {profileModal ? <ProfileModal closeFunction={handleClose} /> : null}
        {displayThoughtModal ? (
          <DisplayThought closeFunction={handleClose} />
        ) : null}
      </Dialog>
    </div>
  );
};
