import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Button,
  IconButton,
  Slide,
  Toolbar,
  Tooltip,
  Typography,
  useScrollTrigger,
} from "@material-ui/core";
import { Close, Person, Report, ThumbUpAltOutlined } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { NavStyles } from "../classes";
import { Types } from "../../redux/types";
import { useState } from "react";
import { UpdatePost } from "../../requests";
import { State } from "../../redux/store";
// SCROLL COMPONENT
interface SlideProps {
  window?: () => Window;
  children: React.ReactElement;
}
const HideOnScroll = (props: SlideProps) => {
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

type IAppbar =
  | {
      variant: "Profile";
      closeFunction: () => void;
    }
  | {
      variant: "NavBar";
    }
  | {
      variant: "DisplayThought";
      closeFunction: () => void;
      author?: string;
    }
  | {
      variant: "Thought";
      closeFunction: () => void;
      editMode: boolean;
    }
  | {
      variant: "Bottom-Nav";
    };

export const CustomAppBar = (props: IAppbar) => {
  const dispatch = useDispatch();
  const user = useSelector((state: State) => state.UserReducer);
  const userExist = user.exist;
  const [nav_value, nav_setValue] = useState(0);
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
                      onClick={() =>
                        dispatch({
                          type: Types.modalTypes.TOGGLE_PROFILE_MODAL,
                        })
                      }
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
    case "Bottom-Nav": {
      return (
        <BottomNavigation
          value={nav_value}
          showLabels
          onChange={(event, nav_newValue) => {
            nav_setValue(nav_newValue);
          }}
          style={{
            marginTop: "10px",
            minWidth: "500px",
            position: "absolute",
            left: "50%",
            transform: "translate(-50%, 0)",
          }}
        >
          <BottomNavigationAction
            label="Like"
            icon={<ThumbUpAltOutlined color="secondary" />}
            onClick={UpdatePost}
          />
          <BottomNavigationAction
            label="Report"
            icon={<Report color="secondary" />}
          />
        </BottomNavigation>
      );
    }
  }
};
