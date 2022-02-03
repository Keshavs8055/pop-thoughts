import { Box, Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { CustomLoading } from "../../components/Loading/loading";
import { Post } from "./../../components/card/card";
import { useSelector } from "react-redux";
import { State, store } from "../../redux/store";
import { getFirestoreCollection } from "../../firebase/functions";

const Homepage = () => {
  // COMPOENT STATE
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [postLoading, togglePostLoading] = useState<boolean>(true);
  const [makeMoreRequests, setMakeMoreRequests] = useState<boolean>(true);
  // REDUX STATE
  const posts = useSelector(
    (state: State) => state.ThoughtsReducer.displayThoughts
  );
  const loading = useSelector((state: State) => state.LoadingReducer.loading);
  const dispatch = store.dispatch;
  // SCROLL HANDLER
  useEffect(() => {
    const HandleScroll = (e: any) => {
      let call = true;
      if (
        call &&
        window.innerHeight + window.scrollY >= document.body.offsetHeight &&
        makeMoreRequests
      ) {
        setCurrentPage((s) => s + 1);
        call = false;
      }
    };
    window.addEventListener("scroll", HandleScroll);
    return () => window.removeEventListener("scroll", HandleScroll);
  }, [makeMoreRequests]);

  useEffect(() => {
    togglePostLoading(true);
    getFirestoreCollection("thoughts", currentPage)
      .then((data) => {
        if (!data) return;
        dispatch({
          type: "FECTH_NEW",
          payload: data,
        });
      })
      .catch((e) => {
        dispatch({
          type: "SET_NEW_ALERT",
          payload: {
            message: "No More Thoughts Available",
            display: true,
            type: 0,
          },
        });
        setMakeMoreRequests(false);
      });
    if (!makeMoreRequests) {
      togglePostLoading(false);
      setCurrentPage(currentPage);
      return;
    }
  }, [currentPage, makeMoreRequests, dispatch]);
  return (
    <Box style={{ minHeight: "102vh" }}>
      {loading ? <CustomLoading variant="global" /> : null}
      <Grid container zeroMinWidth alignItems="stretch" justify="center">
        {posts && posts.length > 0 ? (
          <>
            {posts.map((post, i) => {
              return <Post post={{ ...post }} key={i} userPost={false} />;
            })}
          </>
        ) : (
          <Box marginTop="10px">
            <Typography variant="subtitle1" align="center" color="textPrimary">
              This is the time to let the world know what you think!
            </Typography>
          </Box>
        )}
      </Grid>
      {postLoading ? (
        <Typography variant="subtitle1" align="center" color="textPrimary">
          Scroll For More
        </Typography>
      ) : null}
    </Box>
  );
};
export default Homepage;
