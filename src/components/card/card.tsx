import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Box, Grid, IconButton, Tooltip } from "@material-ui/core";
import {
  SubjectOutlined,
  // ThumbUp,
  // ThumbUpAltOutlined,
} from "@material-ui/icons";
import { CardStyles } from "../../utils/classes";
import { useDispatch } from "react-redux";
import { Types } from "../../redux/types";
import { IPostComp } from "../../utils/interfaces";

export const Post: React.FC<IPostComp> = ({ userPost, post }) => {
  const classes = CardStyles();
  const dispatch = useDispatch();

  const handleEdit = () => {
    dispatch({
      type: Types.thoughtTypes.UPDATE_CONTENT,
      payload: post.content,
    });
    dispatch({ type: Types.modalTypes.TOGGLE_PROFILE_MODAL });
    dispatch({ type: Types.modalTypes.SET_THOUGHT_EDIT });
    dispatch({
      type: Types.displayTypes.SET_THOUGHT_TO_DISPLAY,
      payload: post,
    });
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
              whiteSpace="pre-line"
            ></Box>
            <Typography variant="body2" component="p">
              {post.trimmed}
            </Typography>
          </CardContent>
          <CardActions>
            {userPost ? (
              // ONLY VISIBLE TO THE WRITER
              <Button onClick={handleEdit} variant="outlined" color="secondary">
                Edit
              </Button>
            ) : null}
            {/* NO ACTIONS AVAILABLE IF WRITER ACCESS THE THOUGHT */}
            {userPost ? null : (
              //  ACTIONS FOR LIKING AND REPORTING
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                width="100%"
              >
                {/* {liked ? (
                  <IconButton onClick={() => Handlelike(false)}>
                    <ThumbUp color="secondary" />
                  </IconButton>
                ) : (
                  <IconButton onClick={() => Handlelike(true)}>
                    <ThumbUpAltOutlined color="secondary" />
                  </IconButton>
                )} */}
                <Button variant="text">{post.author}</Button>

                <Tooltip title="Show Full">
                  <IconButton
                    onClick={() => {
                      dispatch({
                        type: Types.modalTypes.DISPLAY_THOUGHT,
                      });
                      dispatch({
                        type: Types.displayTypes.SET_THOUGHT_TO_DISPLAY,
                        payload: { ...post },
                      });
                    }}
                  >
                    <SubjectOutlined color="secondary" />
                  </IconButton>
                </Tooltip>
              </Box>
            )}
          </CardActions>
        </Card>
      </Box>
    </Grid>
  );
};
