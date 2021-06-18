import { Box, Typography } from "@material-ui/core";
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

        <CustomAppBar variant="Bottom-Nav" />
      </Box>
    </>
  );
};
