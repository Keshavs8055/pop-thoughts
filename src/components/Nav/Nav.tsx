import React from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Person } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { ModalTypes } from "../../redux/modal/modal.action";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
      color: theme.palette.primary.contrastText,
    },
    title: {
      flexGrow: 1,
    },
  })
);
//**************
//COMPONENT-NAVBAR
//**************
const NavBar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton}>
            <Person color="secondary" />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Pop Thoughts
          </Typography>
          <Button
            onClick={() => dispatch({ type: ModalTypes.TOGGLE_LOGIN_MODAL })}
            color="secondary"
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
