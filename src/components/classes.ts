import { makeStyles } from "@material-ui/core";

//LOGIN FORMS

export const LoginFormStyles = makeStyles((theme) => ({
  inputField: {
    marginBottom: theme.spacing(2),
  },
  helperText: {
    color: theme.palette.error.main,
  },
}));
// NAVBAR Styles

export const NavStyles = makeStyles((theme) => ({
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
}));
// THOUGHT CARD STYLES

export const CardStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});
