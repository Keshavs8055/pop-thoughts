import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Box, Grid, IconButton } from "@material-ui/core";
import { Report, ThumbUp, ThumbUpAltOutlined } from "@material-ui/icons";
import { CardStyles } from "../classes";

export const Post = () => {
  const classes = CardStyles();
  const [liked, Handlelike] = React.useState(false);

  return (
    <Grid item xs={12} sm={8} lg={5}>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            marginBottom={2}
          >
            <Typography variant="h5" component="h2">
              Title
            </Typography>

            <Button variant="text">John Doe</Button>
          </Box>
          <Typography variant="body2" component="p">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam
            illo aspernatur voluptatem facere pariatur ducimus odit molestiae
            modi in suscipit ad quos eligendi quidem enim veritatis ipsa,
            excepturi quis iste!
          </Typography>
        </CardContent>
        <CardActions>
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
              <Report color="secondary" />
            </IconButton>
          </Box>
        </CardActions>
      </Card>
    </Grid>
  );
};
