import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  makeStyles,
  TextField,
} from "@material-ui/core";
import React from "react";

type IMainForm = {
  variant: "login" | "signup";
};

const applyStyles = makeStyles((theme) => ({
  inputField: {
    marginBottom: theme.spacing(2),
  },
  helperText: {
    color: theme.palette.error.main,
  },
}));

export const MainForm: React.FC<IMainForm> = ({ variant }) => {
  const classes = applyStyles();
  //**************
  //STATE
  //**************
  const [errors, setError] = React.useState({
    fullName: false,
    email: false,
    password: false,
    confirmPassword: false,
  });
  const [values, setValue] = React.useState({
    password: "",
    email: "",
    fullName: "",
    confirmPassword: "",
  });
  //**************
  //INPUT CHANGE
  //**************
  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = e.currentTarget;
    setValue({ ...values, [name]: value });
    switch (name) {
      case "email":
        let re = /\S+@\S+\.\S+/;
        setError({ ...errors, email: !re.test(value) });
        break;
      case "fullName":
        let n_re = /^[a-zA-Z\s]*$/;
        setError({ ...errors, fullName: !n_re.test(value) });
        break;
      case "password":
        let p_re = /^(?=.*[0-9])(?=.*[?!@#$%^&*])[a-zA-Z0-9!?@#$%^&*]{8,16}$/;
        setError({ ...errors, password: !p_re.test(value) });
        break;
      case "confirmPassword":
        let cp_error = values.password === values.confirmPassword;

        setError({ ...errors, confirmPassword: !cp_error });
        break;
      default:
        return true;
    }
  };
  //**************
  //COMPONENT RETURN
  //**************
  switch (variant) {
    case "login":
      return (
        <Box margin={0} padding={1}>
          <FormControl className={classes.inputField} fullWidth>
            <TextField
              error={errors.email}
              label="Email"
              name="email"
              type="email"
              variant="outlined"
              color="secondary"
              autoComplete="off"
              onChange={handleChange}
            ></TextField>
            {errors.email ? (
              <FormHelperText className={classes.helperText}>
                Enter a valid email
              </FormHelperText>
            ) : null}
          </FormControl>

          <FormControl fullWidth className={classes.inputField}>
            <TextField
              error={errors.password}
              name="password"
              label="Password"
              type="password"
              variant="outlined"
              color="secondary"
              onChange={handleChange}
            ></TextField>
            {errors.password ? (
              <FormHelperText className={classes.helperText}>
                Password contains atleast a number and a special character
                (?!@#$%^&*)
              </FormHelperText>
            ) : null}
          </FormControl>
          <Button color="secondary" variant="contained">
            Login
          </Button>
        </Box>
      );
    case "signup":
      return (
        <Box margin={0} padding={1}>
          <FormControl className={classes.inputField} fullWidth>
            <TextField
              error={errors.fullName}
              label="Full Name"
              name="fullName"
              type="name"
              variant="outlined"
              color="secondary"
              onChange={handleChange}
              autoComplete="off"
            ></TextField>
            {errors.fullName ? (
              <FormHelperText className={classes.helperText}>
                Enter a valid Name
              </FormHelperText>
            ) : null}
          </FormControl>
          <FormControl fullWidth className={classes.inputField}>
            <TextField
              error={errors.email}
              name="email"
              label="Email"
              type="email"
              variant="outlined"
              color="secondary"
              onChange={handleChange}
              autoComplete="off"
            ></TextField>
            {errors.email ? (
              <FormHelperText className={classes.helperText}>
                Enter a valid Email
              </FormHelperText>
            ) : null}
          </FormControl>
          <FormControl fullWidth className={classes.inputField}>
            <TextField
              error={errors.password}
              label="Password"
              name="password"
              type="password"
              variant="outlined"
              onChange={handleChange}
              color="secondary"
            ></TextField>
            {errors.password ? (
              <FormHelperText className={classes.helperText}>
                Password contains atleast a number and a special character
                (?!@#$%^&*) <br />
                Pasword must be atleast 8 characters long
              </FormHelperText>
            ) : null}
          </FormControl>
          <FormControl fullWidth className={classes.inputField}>
            <TextField
              error={errors.confirmPassword}
              label="Confirm Password"
              type="password"
              variant="outlined"
              name="confirmPassword"
              onChange={handleChange}
              color="secondary"
            ></TextField>
            {errors.confirmPassword ? (
              <FormHelperText className={classes.helperText}>
                Passwords don't match
              </FormHelperText>
            ) : null}
          </FormControl>

          <Button color="secondary" variant="contained">
            Sign-Up
          </Button>
        </Box>
      );
  }
};
