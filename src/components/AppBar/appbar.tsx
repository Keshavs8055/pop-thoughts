import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Close, Person } from "@material-ui/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavStyles } from "../classes";
// import { State } from "../../redux/store";
import { Types } from "../../redux/types";

type IAppbar =
  | {
      variant: "Profile" | "Thought";
      closeFunction: () => void;
    }
  | {
      variant: "NavBar ";
    };

export const CustomAppBar = (props: IAppbar) => {
  const dispatch = useDispatch();
  const user = useSelector(() => ({ user: true }));
  switch (props.variant) {
    case "NavBar ":
      const classes = NavStyles();

      return (
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
      );
    case "Thought":
      return (
        <AppBar position="relative">
          <Toolbar>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              width="100%"
              maxWidth="900px"
              margin="auto"
            >
              <Typography variant="h6">Post A New Thought</Typography>
              <IconButton
                edge="end"
                color="secondary"
                onClick={props.closeFunction}
                aria-label="close"
              >
                <Close />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      );
    case "Profile":
      return (
        <AppBar position="relative">
          <Toolbar>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              width="100%"
              maxWidth="900px"
              margin="auto"
            >
              <Typography variant="h6">Profile</Typography>
              <IconButton
                edge="end"
                color="secondary"
                onClick={props.closeFunction}
                aria-label="close"
              >
                <Close />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      );
  }
};
