import { Box, Grid, Typography } from "@material-ui/core";
import React from "react";
import { CustomAppBar } from "../../AppBar/appbar";
import { Post } from "../../card/card";
interface IProfileProps {
  closeFunction: () => boolean;
}

export const ProfileModal: React.FC<IProfileProps> = ({ closeFunction }) => {
  return (
    <>
      <CustomAppBar variant="Profile" closeFunction={closeFunction} />

      <Box width="100%" marginTop={2}>
        <Typography variant="h5" align="center">
          John Doe
        </Typography>
        <Typography variant="subtitle2" align="center">
          johnDoe@example.com
        </Typography>
      </Box>
      <Box
        width="100%"
        maxWidth="900px"
        marginLeft="auto"
        marginRight="auto"
        marginTop={2}
      >
        <Grid
          container
          style={{ marginTop: "10px" }}
          alignItems="center"
          justify="space-evenly"
        >
          <Post
            userPost
            post={{
              title: "Title",
              content: "WEll some content who no one cares about.",
            }}
          />
          <Post
            userPost
            post={{
              title: "Title",
              content: "WEll some content who no one cares about.",
            }}
          />
        </Grid>
      </Box>
    </>
  );
};
