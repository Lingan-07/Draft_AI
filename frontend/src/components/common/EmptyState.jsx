import {
  Box,
  Typography,
} from "@mui/material";

const EmptyState = ({
  message = "No Data Found",
}) => {
  return (
    <Box py={5} textAlign="center">
      <Typography color="text.secondary">
        {message}
      </Typography>
    </Box>
  );
};

export default EmptyState;