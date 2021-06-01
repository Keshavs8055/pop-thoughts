import { makeStyles } from "@material-ui/core";

//LOGIN FORMS

export const FormStyles = makeStyles((theme) => ({
  inputField: {
    marginBottom: theme.spacing(2),
  },
  helperText: {
    color: theme.palette.error.main,
  },
  textarea: {
    background: "transparent",
    resize: "vertical",
    padding: theme.spacing(2),
    outline: "none",
    fontFamily: theme.typography.fontFamily,
    color: "#fff",
    lineHeight: "1.1876em",
    borderRadius: "4px",
    boxShadow: theme.shadows[10],
    letterSpacing: "0.00938em",
    border: `1px solid transparent`,
    transitionDuration: `${theme.transitions.duration.short}`,
    "&:focus": {
      border: `1px solid ${theme.palette.secondary.main}`,
    },
    "&:focus::placeholder": {
      color: "transparent",
    },
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
