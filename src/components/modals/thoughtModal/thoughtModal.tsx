import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  TextareaAutosize,
} from "@material-ui/core";
import { IModal } from "../modals";
import { FormStyles } from "../../../utils/classes";
import { CustomAppBar } from "../../AppBar/appbar";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../../redux/store";
import { Types } from "../../../redux/types";
import {
  postNewThought,
  updateThoughtData,
} from "../../../utils/requests/thought.req";

export const ThoughtModal: React.FC<IModal> = ({ closeFunction }) => {
  const classes = FormStyles();
  const [errors, setError] = React.useState({
    thought: true,
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
    dispatch({ type: Types.thoughtTypes.UPDATE_CONTENT, payload: value });
    if (value.length < 250 || value.length > 1000) {
      setError({ ...errors, [name]: true });
    } else {
      setError({ ...errors, [name]: false });
    }
  };
  const checkError = () => {
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
      return false;
    }
    return true;
  };
  const handleSubmit = () => {
    let check = checkError();
    if (!check) return;
    let len = Math.random() * (300 - 250) + 250;
    const trimmedString = `${content.substring(0, len)}...`;
    postNewThought({
      content: content,
      dateCreated: new Date(),
      trimmed: trimmedString,
    });
  };
  const { id } = useSelector((state: State) => state.ThoughtToDisplay);
  const handleEditSubmit = () => {
    let check = checkError();
    if (!check) return;
    let len = Math.random() * (300 - 250) + 200;
    const trimmedString = `${content.substring(0, len)}...`;
    updateThoughtData(id, { content: content, trimmed: trimmedString }).then(
      (rs) => {
        dispatch({ type: Types.modalTypes.CLOSE_ALL });
      }
    );
    // CLOSE WHEN DONE;
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
          <Button
            variant="contained"
            color="secondary"
            onClick={handleEditSubmit}
            disabled={loading || errors.thought}
          >
            Update
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={loading || errors.thought}
          >
            Submit
          </Button>
        )}
      </Box>
    </>
  );
};
