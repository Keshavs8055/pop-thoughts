import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  TextField,
} from "@material-ui/core";
import React from "react";
import { FormStyles } from "../../../classes";
import { handleLoginSubmit, handleSignUpSubmit } from "./functions";

type IMainForm = {
  variant: "login" | "signup";
};

export const MainForm: React.FC<IMainForm> = ({ variant }) => {
  const classes = FormStyles();
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
  const handleChange = async (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = e.currentTarget;
    await setValue({ ...values, [name]: value });
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
        console.log(values.password, values.confirmPassword);

        let p_re = /^(?=.*[0-9])(?=.*[?!@#$%^&*])[a-zA-Z0-9!?@#$%^&*]{8,16}$/;
        setError({ ...errors, password: !p_re.test(value) });
        break;
      case "confirmPassword":
        setError({ ...errors, confirmPassword: false });
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
        //************
        //LOGIN
        //************
        <Box margin={0} padding={1}>
          <FormControl className={classes.inputField} fullWidth>
            <TextField
              error={errors.email}
              label="Email"
              name="email"
              type="email"
              variant="outlined"
              color="primary"
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
              color="primary"
              onChange={handleChange}
            ></TextField>
            {errors.password ? (
              <FormHelperText className={classes.helperText}>
                Password contains atleast a number and a special character
                (?!@#$%^&*)
              </FormHelperText>
            ) : null}
          </FormControl>
          <Button
            color="primary"
            disabled={errors.email || errors.password}
            onClick={() => handleLoginSubmit({ ...values })}
            variant="contained"
          >
            Login
          </Button>
        </Box>
      );
    case "signup":
      return (
        //************
        //SIGNUP
        //************
        <Box margin={0} padding={1}>
          <FormControl className={classes.inputField} fullWidth>
            <TextField
              error={errors.fullName}
              label="Full Name"
              name="fullName"
              type="name"
              variant="outlined"
              color="primary"
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
              color="primary"
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
              // type="password"
              variant="outlined"
              onChange={handleChange}
              color="primary"
            ></TextField>
            {errors.password ? (
              <FormHelperText className={classes.helperText}>
                Password contains atleast a number and a special character
                (?!@#$%^&*) <br />
                Pasword must be atleast 8 characters and atmost 16 characters
              </FormHelperText>
            ) : null}
          </FormControl>
          <FormControl fullWidth className={classes.inputField}>
            <TextField
              error={errors.confirmPassword}
              label="Confirm Password"
              // type="password"
              variant="outlined"
              name="confirmPassword"
              onChange={handleChange}
              color="primary"
            ></TextField>
            {errors.confirmPassword ? (
              <FormHelperText className={classes.helperText}>
                Passwords don't match
              </FormHelperText>
            ) : null}
          </FormControl>

          <Button
            color="primary"
            disabled={
              errors.confirmPassword ||
              errors.email ||
              errors.fullName ||
              errors.password
            }
            onClick={() => {
              if (values.confirmPassword !== values.password)
                setError({ ...errors, confirmPassword: true });
              handleSignUpSubmit({ ...values });
            }}
            variant="contained"
          >
            Sign-Up
          </Button>
        </Box>
      );
  }
};
