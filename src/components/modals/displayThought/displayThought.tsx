import { Box, Button, ButtonGroup, Typography } from "@material-ui/core";
import { InfoOutlined, ThumbUpAltOutlined } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../../redux/store";
import { CustomAppBar } from "../../AppBar/appbar";

interface IDisplayThought {
  closeFunction: () => void;
}

export const DisplayThought: React.FC<IDisplayThought> = ({
  closeFunction,
}) => {
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
        <Typography align="center" variant="body1">
          {post.content}
        </Typography>
        <Box
          width="100%"
          display="flex"
          marginTop="10px"
          justifyContent="center"
        >
          {exist ? (
            <ButtonGroup
              variant="contained"
              color="primary"
              aria-label="text primary button group"
              size="medium"
            >
              <Button startIcon={<ThumbUpAltOutlined color="secondary" />}>
                Like
              </Button>
              <Button startIcon={<InfoOutlined color="secondary" />}>
                Report
              </Button>
            </ButtonGroup>
          ) : (
            <Button
              onClick={() => {
                dispatch({ type: "CLOSE_ALL" });
                dispatch({ type: "TOGGLE_LOGIN_MODAL" });
              }}
            >
              Login For More Options
            </Button>
          )}
          {/* <CustomAppBar variant="Bottom-Nav" /> */}
        </Box>
      </Box>
    </>
  );
};
