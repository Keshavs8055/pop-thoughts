import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { Close, Person } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { NavStyles } from "../classes";
import { Types } from "../../redux/types";

type IAppbar =
  | {
      variant: "Profile";
      closeFunction: () => void;
    }
  | {
      variant: "NavBar";
    }
  | {
      variant: "Thought";
      closeFunction: () => void;
      editMode: boolean;
    };

export const CustomAppBar = (props: IAppbar) => {
  const dispatch = useDispatch();
  const user = useSelector(() => ({ user: "here" }));
  switch (props.variant) {
    case "NavBar":
      const classes = NavStyles();

      return (
        <AppBar position="static">
          <Toolbar>
            {user.user ? (
              <Tooltip title="Profile">
                <IconButton
                  className={classes.menuButton}
                  onClick={() =>
                    dispatch({ type: Types.modalTypes.TOGGLE_PROFILE_MODAL })
                  }
                >
                  <Person color="secondary" />
                </IconButton>
              </Tooltip>
            ) : null}
            <Typography variant="h6" className={classes.title}>
              Pop Thoughts
            </Typography>
            {user.user ? (
              <Button
                onClick={() => {
                  dispatch({ type: Types.modalTypes.TOGGLE_THOUGHT_MODAL });
                }}
                color="secondary"
              >
                New Thought
              </Button>
            ) : (
              <Button
                onClick={() =>
                  dispatch({ type: Types.modalTypes.TOGGLE_LOGIN_MODAL })
                }
                color="secondary"
              >
                Login
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
              {props.editMode ? (
                <Typography variant="h6">Edit Your Thought</Typography>
              ) : (
                <Typography variant="h6">Post A New Thought</Typography>
              )}
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
