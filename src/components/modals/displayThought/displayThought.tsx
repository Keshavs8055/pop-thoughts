import { Box, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import { State } from "../../../redux/store";
import { IModalProps } from "../../../utils/interfaces";
import { CustomAppBar } from "../../AppBar/appbar";

export const DisplayThought: React.FC<IModalProps> = ({ closeFunction }) => {
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
        whiteSpace="pre-line"
      >
        <Typography align="left" variant="h6">
          {post.content}
        </Typography>
      </Box>
    </>
  );
};
