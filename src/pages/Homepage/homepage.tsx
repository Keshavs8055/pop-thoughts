import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { CustomLoading } from "../../components/Loading/loading";
import { getAllThoughts } from "../../requests";
import { Post } from "./../../components/card/card";
import { IPost } from "../../components/card/card";
const Homepage = () => {
  const [loading, toggleLoading] = useState<boolean>(true);
  const [posts, updatePosts] = useState<IPost[]>([]);
  useEffect(() => {
    getAllThoughts("data")
      .then((res) => {
        updatePosts(res);
      })
      .then(() => toggleLoading(false))
      .catch((err) => {
        console.log(err);
        toggleLoading(false);
      });
  }, []);
  return (
    <Grid
      container
      style={{ marginTop: "10px" }}
      alignItems="flex-start"
      justify="space-evenly"
    >
      {loading ? <CustomLoading /> : null}
      {posts.length > 0
        ? posts.map((post, i) => {
            return <Post post={{ ...post }} key={i} userPost={false} />;
          })
        : null}
    </Grid>
  );
};
export default Homepage;
