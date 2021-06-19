import { Box, Button, ButtonGroup, Typography } from "@material-ui/core";
import { InfoOutlined, ThumbUpAltOutlined } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { State } from "../../../redux/store";
import { CustomAppBar } from "../../AppBar/appbar";

interface IDisplayThought {
  closeFunction: () => void;
}

export const DisplayThought: React.FC<IDisplayThought> = ({
  closeFunction,
}) => {
  const post = useSelector((state: State) => state.ThoughtToDisplay);
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
          {/* <CustomAppBar variant="Bottom-Nav" /> */}
        </Box>
      </Box>
    </>
  );
};
