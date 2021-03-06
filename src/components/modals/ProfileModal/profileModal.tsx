import { Box, Button, Grid, Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { CustomAppBar } from "../../AppBar/appbar";
import { State } from "../../../redux/store";
import { CustomLoading } from "../../Loading/loading";
import { IModalProps } from "../../../utils/interfaces";
import { Post } from "../../card/card";
import { userLogOut } from "../../../utils/requests/user.reqs";

export const ProfileModal: React.FC<IModalProps> = ({ closeFunction }) => {
  // GET STATE
  const User = useSelector((state: State) => state.UserReducer);
  const posts = useSelector(
    (state: State) => state.ThoughtsReducer.userDisplayThoughts
  );
  // LOADING STATE
  const loading = useSelector((state: State) => state.LoadingReducer.loading);

  // COMPONENT
  return (
    <>
      <CustomAppBar variant="Profile" closeFunction={closeFunction} />

      <Box
        width="100%"
        marginTop={2}
        display="flex"
        alignItems="center"
        justifyContent="space-evenly"
      >
        <Box>
          <Typography variant="h5" align="center">
            {User.fullName}
          </Typography>
          <Typography variant="subtitle2" align="center">
            {User.email}
          </Typography>
        </Box>
        <Button variant="contained" onClick={userLogOut}>
          Log Out
        </Button>
      </Box>
      <Box
        padding={2}
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
          {posts.length > 0 ? (
            posts.map((post, i) => {
              return <Post post={{ ...post }} key={i} userPost={true} />;
            })
          ) : loading ? (
            <CustomLoading variant="circlular" />
          ) : null}
        </Grid>
      </Box>
    </>
  );
};
