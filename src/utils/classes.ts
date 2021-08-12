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
      border: `1px solid ${theme.palette.primary.main}`,
    },
    "&:focus::placeholder": {
      color: "transparent",
    },
  },
}));
// NAVBAR
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

// ALERT COMPONENT
export const AlertStyles = makeStyles((theme) => ({
  root: {
    zIndex: 9999,
    left: "50%",
    top: "0",
    transform: "translate(-50%, 0)",
    minWidth: "30vw",
    "@media screen and (max-width: 1000px)": {
      top: "100%",
      transform: "translate(-50%, -100%)",
      minWidth: "80vw",
    },
  },
}));

// LOADING STYLE
export const LoadingStyles = makeStyles((theme) => ({
  "@keyframes loadingAnim": {
    "0%": {
      left: "-90%",
    },
    "100%": {
      left: "100%",
    },
  },
  root: {
    zIndex: theme.zIndex.drawer + 10,
    maxHeight: "5px",
    position: "fixed",
  },
  circularLoadingBox: {
    width: "100vw",
    position: "fixed",
    bottom: 0,
    left: "50%",
    transform: "translate(-50%, 0)",
  },
  loading: {
    width: "60vw",
    background: theme.palette.secondary.main,
    position: "fixed",
    left: "-100%",
    minHeight: "3px",
    maxHeight: "3px",
    top: 0,
    borderRadius: "4px",
    animation: `$loadingAnim infinite ease-in-out 0.4s`,
    zIndex: 10,
  },
}));
//LINKS
export const LinkStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
    fontSize: theme.typography.fontSize + 20 + "px",
    color: theme.palette.primary.main,
    textAlign: "center",
    display: "block",
    padding: 0,
    margin: 0,
  },
  reset: {
    font: "inherit",
    color: "inherit",
    textDecoration: "none",
  },
}));
