import { Box, CircularProgress } from "@material-ui/core";
import { LoadingStyles } from "../classes";

interface ILoading {
  variant: "global" | "circlular";
}

export const CustomLoading: React.FC<ILoading> = ({ variant }) => {
  const classes = LoadingStyles();
  switch (variant) {
    case "circlular":
      return (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          padding="5px"
        >
          <CircularProgress color="secondary" />
        </Box>
      );
    case "global":
      return (
        <Box position="fixed" top="0" width="100vw" className={classes.root}>
          <div className={classes.loading}></div>
        </Box>
      );
  }
};
