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
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../../redux/store";
import { Types } from "../../../redux/types";

export const ThoughtModal: React.FC<IModal> = ({ closeFunction }) => {
  const classes = FormStyles();
  const [errors, setError] = React.useState({
    title: false,
    thought: false,
    formError: false,
  });
  const { title, content } = useSelector(
    (state: State) => state.ThoughtReducer
  );
  const dispatch = useDispatch();
  const modalEditorMode = title.length > 0 && content.length > 0;
  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case "title":
        dispatch({ type: Types.thoughtTypes.UPDATE_TITLE, payload: value });
        if (value.length < 5) {
          setError({ ...errors, title: true });
        } else {
          setError({ ...errors, title: false });
        }
        break;
      case "thought":
        dispatch({ type: Types.thoughtTypes.UPDATE_CONTENT, payload: value });
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
      <CustomAppBar
        variant="Thought"
        editMode={modalEditorMode}
        closeFunction={closeFunction}
      />
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
            value={title}
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
            value={content}
          />
          {errors.thought ? (
            <FormHelperText className={classes.helperText}>
              Try To Think Big(Too Short)
            </FormHelperText>
          ) : null}
        </FormControl>
        {modalEditorMode ? (
          <Button variant="contained" color="secondary">
            Update
          </Button>
        ) : (
          <Button variant="contained" color="secondary" onClick={handleSubmit}>
            Submit
          </Button>
        )}
      </Box>
    </>
  );
};
