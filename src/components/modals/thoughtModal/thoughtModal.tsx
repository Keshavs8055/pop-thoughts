import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  TextareaAutosize,
  TextField,
} from "@material-ui/core";
import { IModal } from "../modals";
import { FormStyles } from "../../classes";
import { CustomAppBar } from "../../AppBar/appbar";
export const ThoughtModal: React.FC<IModal> = ({ closeFunction }) => {
  const classes = FormStyles();
  const [errors, setError] = React.useState({
    title: false,
    thought: false,
    formError: false,
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case "title":
        if (value.length < 5) {
          setError({ ...errors, title: true });
        } else {
          setError({ ...errors, title: false });
        }
        break;
      case "thought":
        if (value.length < 25) {
          setError({ ...errors, thought: true });
        } else {
          setError({ ...errors, thought: false });
        }
        break;
    }
  };
  const handleSubmit = () => {
    if (errors.thought || errors.title) {
      setError({ ...errors, formError: true });
      return;
    }
  };
  return (
    <>
      {/* <AppBar position="relative">
        <Toolbar>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
            maxWidth="900px"
            margin="auto"
          >
            <Typography variant="h6">Post A New Thought</Typography>
            <IconButton
              edge="end"
              color="secondary"
              onClick={closeFunction}
              aria-label="close"
            >
              <Close />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar> */}
      <CustomAppBar variant="Thought" closeFunction={closeFunction} />
      <Box width="100%" maxWidth="900px" margin="auto" marginTop={2}>
        <FormControl className={classes.inputField} fullWidth>
          <TextField
            label="Title"
            name="title"
            type="text"
            variant="outlined"
            color="secondary"
            autoComplete="off"
            onChange={handleChange}
            error={errors.title}
          />
          {errors.title ? (
            <FormHelperText className={classes.helperText}>
              People Are Not Gonna Read It With That Title <br />
              Title Too Short
            </FormHelperText>
          ) : null}
        </FormControl>
        <FormControl className={classes.inputField} fullWidth>
          <TextareaAutosize
            placeholder="Thought.."
            name="thought"
            color="secondary"
            rowsMin={9}
            autoComplete="off"
            className={classes.textarea}
            onChange={handleChange}
          />
          {errors.thought ? (
            <FormHelperText className={classes.helperText}>
              Try To Think Big(Too Short)
            </FormHelperText>
          ) : null}
        </FormControl>
        <Button variant="contained" color="secondary" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </>
  );
};
