import { Box, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { CustomLoading } from "../../components/Loading/loading";
import { getThoughtsNextPage } from "../../requests";
import { Post } from "./../../components/card/card";
import { useSelector } from "react-redux";
import { State } from "../../redux/store";

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
    if (!makeMoreRequests) {
      console.log("More Requests Not Required");
      togglePostLoading(false);
      setCurrentPage(currentPage);
      return;
    }
    getThoughtsNextPage(currentPage, 3).then((res) => {
      if (!res) {
        togglePostLoading(false);
        setMakeMoreRequests(false);
        return;
      }
      togglePostLoading(false);
    });
  }, [currentPage, makeMoreRequests]);
  return (
    <Box style={{ minHeight: "102vh" }}>
      {loading ? <CustomLoading variant="global" /> : null}
      <Grid container alignItems="center" justify="center" spacing={2}>
        {posts.length > 0
          ? posts.map((post, i) => {
              return <Post post={{ ...post }} key={i} userPost={false} />;
            })
          : null}
      </Grid>
      {postLoading ? <CustomLoading variant="circlular" /> : null}
    </Box>
  );
};
export default Homepage;
