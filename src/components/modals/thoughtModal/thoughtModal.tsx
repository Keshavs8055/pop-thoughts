import {
  AppBar,
  Box,
  FormControl,
  IconButton,
  TextareaAutosize,
  TextField,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { IModal } from "../modals";
import { FormStyles } from "../../classes";
export const ThoughtModal: React.FC<IModal> = ({ closeFunction }) => {
  const classes = FormStyles();
  return (
    <>
      <AppBar position="relative">
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
      </AppBar>
      <Box width="100%" maxWidth="900px" margin="auto" marginTop={2}>
        <FormControl className={classes.inputField} fullWidth>
          <TextField
            label="Title"
            name="title"
            type="text"
            variant="outlined"
            color="secondary"
            autoComplete="off"
          />
        </FormControl>
        <FormControl className={classes.inputField} fullWidth>
          <TextareaAutosize
            placeholder="Thought.."
            name="thought"
            color="secondary"
            rowsMin={9}
            autoComplete="off"
            className={classes.textarea}
          />
        </FormControl>
      </Box>
    </>
  );
};
