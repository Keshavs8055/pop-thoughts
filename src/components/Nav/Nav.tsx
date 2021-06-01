import React from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Person } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { NavStyles } from "../classes";
import { Types } from "../../redux/types";
// import { State } from "../../redux/store";
//**************
//COMPONENT-NAVBAR
//**************
const NavBar = () => {
  const classes = NavStyles();
  const dispatch = useDispatch();
  const user = useSelector(() => ({ user: true }));
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {user ? (
            <IconButton
              className={classes.menuButton}
              onClick={() =>
                dispatch({ type: Types.modalTypes.TOGGLE_PROFILE_MODAL })
              }
            >
              <Person color="secondary" />
            </IconButton>
          ) : null}
          <Typography variant="h6" className={classes.title}>
            Pop Thoughts
          </Typography>
          {!user ? (
            <Button
              onClick={() =>
                dispatch({ type: Types.modalTypes.TOGGLE_LOGIN_MODAL })
              }
              color="secondary"
            >
              Login
            </Button>
          ) : (
            <Button
              onClick={() =>
                dispatch({ type: Types.modalTypes.TOGGLE_THOUGHT_MODAL })
              }
              color="secondary"
            >
              New Thought
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
