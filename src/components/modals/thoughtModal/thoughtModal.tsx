import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  TextareaAutosize,
} from "@material-ui/core";
import { IModal } from "../modals";
import { FormStyles } from "../../classes";
import { CustomAppBar } from "../../AppBar/appbar";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../../redux/store";
import { Types } from "../../../redux/types";
import { postNewThought } from "../../../requests";

export const ThoughtModal: React.FC<IModal> = ({ closeFunction }) => {
  const classes = FormStyles();
  const [errors, setError] = React.useState({
    thought: false,
    formError: false,
  });
  const [loading, toggleLoading] = React.useState(false);
  const { content } = useSelector((state: State) => state.ThoughtReducer);
  const dispatch = useDispatch();
  const modalEditorMode = useSelector(
    (state: State) => state.ModalReducer.editModeThought
  );
  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case "thought":
        dispatch({ type: Types.thoughtTypes.UPDATE_CONTENT, payload: value });
        if (value.length < 250 || value.length > 1000) {
          setError({ ...errors, thought: true });
        } else {
          setError({ ...errors, thought: false });
        }
        break;
    }
  };
  const handleSubmit = () => {
    toggleLoading(true);
    if (errors.thought || content.length < 1) {
      dispatch({
        type: Types.alertTypes.SET_NEW_ALERT,
        payload: {
          display: true,
          type: 0,
          message: "Check The Values",
        },
      });
      setError({ ...errors, formError: true });
      return;
    }
    let len = Math.random() * (300 - 250) + 250;
    const trimmedString = `${content.substring(0, len)}...`;
    postNewThought({
      content: content,
      author: "John Doe",
      dateCreated: new Date(),
      trimmed: trimmedString,
    });
  };

  return (
    <>
      <CustomAppBar
        variant="Thought"
        editMode={modalEditorMode}
        closeFunction={closeFunction}
      />
      <Box maxWidth="900px" width="96%" margin="2% auto" marginTop={2}>
        <FormControl className={classes.inputField} fullWidth>
          <TextareaAutosize
            placeholder="Thought.."
            name="thought"
            color="primary"
            rowsMin={9}
            autoComplete="off"
            className={classes.textarea}
            onChange={handleChange}
            value={content}
          />
          {errors.thought ? (
            <FormHelperText className={classes.helperText}>
              Try To Think Big(Must be from 250 chars to 1000 chars)
            </FormHelperText>
          ) : null}
        </FormControl>
        {modalEditorMode ? (
          <Button variant="contained" color="secondary" disabled={loading}>
            Update
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={loading}
          >
            Submit
          </Button>
        )}
      </Box>
    </>
  );
};
