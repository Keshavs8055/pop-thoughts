import { Box, CircularProgress } from "@material-ui/core";

export const CustomLoading = () => {
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
};
