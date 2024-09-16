import {
  AppBar,
  Box,
  Button,
  IconButton,
  Slide,
  Toolbar,
  Tooltip,
  Typography,
  useScrollTrigger,
} from "@material-ui/core";
import { Close, Person } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { NavStyles } from "../../utils/classes";
import { Types } from "../../redux/types";
import { IAppbar, ISlideProps } from "../../utils/interfaces";
import { State } from "../../redux/store";

const HideOnScroll = (props: ISlideProps) => {
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

export const CustomAppBar = (props: IAppbar) => {
  const dispatch = useDispatch();
  const user = useSelector((state: State) => state.UserReducer);
  const userExist = user.exist;

  switch (props.variant) {
    case "NavBar":
      const classes = NavStyles();

      return (
        <>
          <HideOnScroll>
            <AppBar>
              <Toolbar>
                {userExist ? (
                  <Tooltip title="Profile">
                    <IconButton
                      className={classes.menuButton}
                      onClick={() => {
                        dispatch({
                          type: Types.modalTypes.TOGGLE_PROFILE_MODAL,
                        });
                      }}
                    >
                      <Person color="secondary" />
                    </IconButton>
                  </Tooltip>
                ) : null}
                <Typography variant="h6" className={classes.title}>
                  Pop Thoughts
                </Typography>
                {userExist ? (
                  <Button
                    onClick={() => {
                      dispatch({
                        type: Types.thoughtTypes.UPDATE_CONTENT,
                        payload: "",
                      });
                      dispatch({ type: Types.modalTypes.TOGGLE_THOUGHT_MODAL });
                    }}
                    color="secondary"
                    variant="contained"
                  >
                    New Thought
                  </Button>
                ) : (
                  <Button
                    onClick={() =>
                      dispatch({ type: Types.modalTypes.TOGGLE_LOGIN_MODAL })
                    }
                    color="secondary"
                    variant="contained"
                  >
                    Login
                  </Button>
                )}
              </Toolbar>
            </AppBar>
          </HideOnScroll>
          <Toolbar />
        </>
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
              marginY="auto"
              marginX="auto"
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
    case "DisplayThought":
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
              <Typography variant="h6" color="secondary">
                {props.author}
              </Typography>
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
