import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { CustomLoading } from "../../components/Loading/loading";
import { getThoughtsNextPage } from "../../requests";
import { Post } from "./../../components/card/card";
import { IPost } from "../../components/card/card";
import { useSelector } from "react-redux";
import { State } from "../../redux/store";

const Homepage = () => {
  useEffect(() => {
    getThoughtsNextPage(1);
  }, []);
  const posts = useSelector(
    (state: State) => state.ThoughtsReducer.displayThoughts
  );
  const loading = useSelector((state: State) => state.LoadingReducer.loading);
  return (
    <Grid
      container
      style={{ marginTop: "10px" }}
      alignItems="flex-start"
      justify="space-evenly"
    >
      {loading ? <CustomLoading variant="global" /> : null}
      {/* <CustomLoading variant="global" /> */}
      {posts.length > 0
        ? posts.map((post, i) => {
            return <Post post={{ ...post }} key={i} userPost={false} />;
          })
        : null}
    </Grid>
  );
};
export default Homepage;
