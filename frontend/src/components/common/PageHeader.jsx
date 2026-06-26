import {
  Box,
  Typography,
} from "@mui/material";

const PageHeader = ({
  title,
  subtitle,
}) => {
  return (
    <Box mb={3}>
      <Typography
        variant="h4"
        fontWeight={700}
      >
        {title}
      </Typography>

      <Typography
        color="text.secondary"
      >
        {subtitle}
      </Typography>
    </Box>
  );
};

export default PageHeader;