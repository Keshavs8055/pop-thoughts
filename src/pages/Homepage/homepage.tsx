import { Grid } from "@material-ui/core";
import React from "react";
import { Post } from "./../../components/card/card";

const Homepage = () => {
  return (
    <Grid
      container
      style={{ marginTop: "10px" }}
      alignItems="flex-start"
      justify="center"
    >
      <Post post={{ title: "Title", content: "Some Content", liked: false }} />
    </Grid>
  );
};
export default Homepage;
