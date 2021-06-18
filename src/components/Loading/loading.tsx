import { Box, CircularProgress, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import { LoadingStyles } from "../classes";
import { State } from "../../redux/store";
interface ILoading {
  variant: "global" | "circlular";
}

export const CustomLoading: React.FC<ILoading> = ({ variant }) => {
  const classes = LoadingStyles();
  const GlobalDisplay = useSelector(
    (state: State) => state.LoadingReducer.loading
  );
  console.log("STATE IN LOADING", GlobalDisplay);

  switch (variant) {
    case "circlular":
      return (
        <Box className={classes.circularLoadingBox} textAlign="center">
          <CircularProgress size={20} color="secondary" />
        </Box>
      );
    case "global":
      if (GlobalDisplay) {
        return (
          <Box position="fixed" top="0" width="100vw" className={classes.root}>
            <div className={classes.loading}></div>
          </Box>
        );
      } else {
        return null;
      }
  }
};