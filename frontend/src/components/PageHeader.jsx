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
        variant="h5"
        fontWeight={700}
        sx={{fontSize: { xs: "1.5rem", sm: "2rem" }}}
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