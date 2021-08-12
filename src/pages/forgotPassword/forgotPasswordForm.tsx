import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  TextField,
  Typography,
} from "@material-ui/core";
import { useState } from "react";
import { useSelector } from "react-redux";
import { store } from "../../redux/store";
import { FormStyles, LinkStyles } from "../../utils/classes";
import { State } from "../../redux/store";
import { Link, Redirect, useHistory } from "react-router-dom";
import { ResetPasswordReq } from "../../utils/requests/user.reqs";

export const ForgotPasswordPage = () => {
  const user = useSelector((state: State) => state.UserReducer);
  const dispatch = store.dispatch;

  const history = useHistory();
  const token = history.location.pathname.split("/")[2];

  // STATE
  const [values, setValue] = useState<{ password: string; confirm: string }>({
    password: "",
    confirm: "",
  });
  const [error, setError] = useState(true);

  const classes = FormStyles();
  const linkStyles = LinkStyles();
  // COMPONENT RETURN
  if (user.exist || !token) {
    return <Redirect to="/" />;
  }

  // HANDLE CHANGE
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value, name } = e.target;
    setValue({ ...values, [name]: value });

    // CHECK PASSWORD
    if (name === "password") {
      let p_re = /^(?=.*[0-9])(?=.*[?!@#$%^&*])[a-zA-Z0-9!?@#$%^&*]{8,16}$/;
      setError(!p_re.test(value));
    }
  };
  // HANDLE SUBMIT
  const handleSubmit = () => {
    if (values.password !== values.confirm) {
      dispatch({
        type: "SET_NEW_ALERT",
        payload: {
          message: `The Passwords Don't Match`,
          type: 0,
          display: true,
        },
      });
      return;
    }
    ResetPasswordReq(token, values.password);
  };
  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box dir="column" justifyContent="center" alignItems="center">
        {error ? (
          <Typography color="error" variant="subtitle2" paragraph>
            {" "}
            Password contains atleast a number and a special character
            (?!@#$%^&*) <br />
            Pasword must be atleast 8 characters and atmost 16 characters
          </Typography>
        ) : null}
        <FormControl fullWidth className={classes.inputField}>
          <TextField
            name="password"
            label="New Password"
            variant="outlined"
            onChange={handleChange}
          />
        </FormControl>
        <FormControl fullWidth className={classes.inputField}>
          <TextField
            name="confirm"
            label="Confirm Password"
            onChange={handleChange}
            variant="outlined"
          />
        </FormControl>
        <ButtonGroup>
          <Button
            variant="contained"
            color="primary"
            disabled={error}
            onClick={handleSubmit}
          >
            Update Password
          </Button>
          <Button variant="outlined" color="primary" disabled={error}>
            <Link to="/" className={linkStyles.reset}>
              Home
            </Link>
          </Button>
        </ButtonGroup>
      </Box>
    </Box>
  );
};
