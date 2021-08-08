import { Box, Button, Typography } from "@material-ui/core";
import { InfoOutlined } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../../redux/store";
import { IModalProps } from "../../../utils/interfaces";
import { CustomAppBar } from "../../AppBar/appbar";

export const DisplayThought: React.FC<IModalProps> = ({ closeFunction }) => {
  const post = useSelector((state: State) => state.ThoughtToDisplay);
  const { exist } = useSelector((state: State) => state.UserReducer);
  const dispatch = useDispatch();
  return (
    <>
      <CustomAppBar
        variant="DisplayThought"
        author={post.author}
        closeFunction={closeFunction}
      />
      <Box
        maxWidth="900px"
        marginLeft="auto"
        marginRight="auto"
        marginTop={2}
        padding={2}
        whiteSpace="pre-line"
      >
        <Typography align="left" variant="body1">
          {post.content}
        </Typography>
        <Box marginTop="10px">
          {exist ? (
            <Button
              variant="contained"
              color="primary"
              startIcon={<InfoOutlined color="secondary" />}
            >
              Report
            </Button>
          ) : (
            <Button
              onClick={() => {
                dispatch({ type: "CLOSE_ALL" });
                dispatch({ type: "TOGGLE_LOGIN_MODAL" });
              }}
              variant="outlined"
            >
              Login For More Options
            </Button>
          )}
        </Box>
      </Box>
    </>
  );
};
