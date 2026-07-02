import {
  Box,
  CircularProgress,
} from "@mui/material";

const Loader = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      py={4}
    >
      <CircularProgress />
    </Box>
  );
};

export default Loader;