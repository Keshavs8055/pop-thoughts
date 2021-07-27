import { Box, Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CustomAppBar } from "../../AppBar/appbar";
// import { Post } from "../../card/card";
import { State } from "../../../redux/store";
import { CustomLoading } from "../../Loading/loading";
interface IProfileProps {
  closeFunction: () => boolean;
}

export const ProfileModal: React.FC<IProfileProps> = ({ closeFunction }) => {
  // GET STATE
  const User = useSelector((state: State) => state.UserReducer);
  const thoughts = useSelector(
    (state: State) => state.ThoughtsReducer.userDisplayThoughts
  );
  // LOADING STATE
  const [loading, toggleLoading] = useState<boolean>(true);

  // HANDLE LOADING
  useEffect(() => {
    toggleLoading(false);
    console.log("PROFILE ", thoughts);
  }, [thoughts]);

  // COMPONENT
  return (
    <>
      <CustomAppBar variant="Profile" closeFunction={closeFunction} />

      <Box width="100%" marginTop={2}>
        <Typography variant="h5" align="center">
          {User.fullName}
        </Typography>
        <Typography variant="subtitle2" align="center">
          {User.email}
        </Typography>
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
          {loading ? <CustomLoading variant="circlular" /> : null}
        </Grid>
      </Box>
    </>
  );
};
