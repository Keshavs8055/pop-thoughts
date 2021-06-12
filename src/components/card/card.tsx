import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Box, Grid, IconButton } from "@material-ui/core";
import {
  Edit,
  LaunchOutlined,
  ThumbUp,
  ThumbUpAltOutlined,
} from "@material-ui/icons";
import { CardStyles } from "../classes";
import { useDispatch } from "react-redux";
import { Types } from "../../redux/types";

export interface IPost {
  title: string;
  content: string;
  liked?: boolean;
  author: string;
  dateCreated: Date;
  id: string;
  likes: number;
  trimmed: string;
}

interface IPostComp {
  userPost?: boolean;
  post: IPost;
}
export const Post: React.FC<IPostComp> = ({ userPost, post }) => {
  const classes = CardStyles();
  const [liked, Handlelike] = React.useState(post.liked || false);
  const dispatch = useDispatch();
  console.log(post);

  const handleEdit = () => {
    dispatch({
      type: Types.thoughtTypes.UPDATE_CONTENT,
      payload: post.content,
    });
    dispatch({ type: Types.thoughtTypes.UPDATE_TITLE, payload: post.title });
    dispatch({ type: Types.modalTypes.TOGGLE_PROFILE_MODAL });
    dispatch({ type: Types.modalTypes.TOGGLE_THOUGHT_MODAL });
  };
  return (
    <Grid item xs={12} sm={8} lg={5}>
      <Box width="100%" position="relative" height="100%" padding={2}>
        <Card className={classes.root} variant="outlined">
          <CardContent>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              marginBottom={2}
            >
              <Typography variant="h5" component="h2">
                {post.title}
              </Typography>
              {userPost ? (
                // ONLY VISIBLE TO THE WRITER
                <IconButton onClick={handleEdit}>
                  <Edit color="secondary" />
                </IconButton>
              ) : (
                // BUTTON TAKES THE USER TO PROFILE
                <Button variant="text">{post.author}</Button>
              )}
            </Box>
            <Typography variant="body2" component="p">
              {post.trimmed}
            </Typography>
          </CardContent>
          <CardActions>
            {/* NO ACTIONS AVAILABLE IF WRITER ACCESS THE THOUGHT */}
            {userPost ? null : (
              //  ACTIONS FOR LIKING AND REPORTING
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                width="100%"
              >
                {liked ? (
                  <IconButton onClick={() => Handlelike(false)}>
                    <ThumbUp color="secondary" />
                  </IconButton>
                ) : (
                  <IconButton onClick={() => Handlelike(true)}>
                    <ThumbUpAltOutlined color="secondary" />
                  </IconButton>
                )}
                <IconButton>
                  <LaunchOutlined color="secondary" />
                </IconButton>
              </Box>
            )}
          </CardActions>
        </Card>
      </Box>
    </Grid>
  );
};
