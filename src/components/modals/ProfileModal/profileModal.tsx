import { Box, Button, Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CustomAppBar } from "../../AppBar/appbar";
import { State, store } from "../../../redux/store";
import { CustomLoading } from "../../Loading/loading";
import { IModalProps, IThought } from "../../../utils/interfaces";
import { Post } from "../../card/card";
import { auth } from "../../../firebase/firebase";
import { loadingDispatch } from "../../../redux/loading/loading.config";
import { getFirestoreDoc } from "../../../firebase/functions";

export const ProfileModal: React.FC<IModalProps> = ({ closeFunction }) => {
  const dispatch = store.dispatch;
  // GET STATE
  const User = useSelector((state: State) => state.UserReducer);
  const [thoughtsToDisplay, updateThoughts] = useState<Array<IThought>>([]);
  // LOADING STATE
  const loading = useSelector((state: State) => state.LoadingReducer.loading);

  useEffect(() => {
    loadingDispatch("START");
    getFirestoreDoc(`users/${User._id}`).then((data) => {
      if (!data) return;
      const { thoughts } = data;

      updateThoughts(thoughts);
    });
    loadingDispatch("DISABLE");
  }, [User._id]);

  const handleSignOut = () => {
    auth.signOut().then(() => {
      dispatch({
        type: "SET_USER",
        payload: {
          _id: "",
          email: "",
          fullName: "",
          exist: false,
        },
      });
      dispatch({
        type: "CLOSE_ALL",
      });
    });
  };

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
        <Button variant="contained" onClick={handleSignOut}>
          Log Out
        </Button>
      </Box>
      <Box
        padding={0}
        // maxWidth="900px"
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
          {thoughtsToDisplay.length > 0 ? (
            thoughtsToDisplay.map((post, i) => {
              return <Post post={{ ...post }} key={i} userPost={true} />;
            })
          ) : loading ? (
            <CustomLoading variant="circlular" />
          ) : (
            <Typography align="center" variant="body2">
              No Thoughts Posted
            </Typography>
          )}
        </Grid>
      </Box>
    </>
  );
};
