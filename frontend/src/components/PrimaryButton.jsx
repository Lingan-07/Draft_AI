import { Button, CircularProgress } from "@mui/material";

const PrimaryButton = ({
  children,
  loading = false,
  onClick,
  type = "button",
  fullWidth = false,
  disabled = false,
}) => {
  return (
    <Button
      variant="contained"
      type={type}
      fullWidth={fullWidth}
      disabled={disabled || loading}
      onClick={onClick}
      sx={{
        borderRadius: 2,
        px: 3,
        py: 1.2,
        fontWeight: 600,
      }}
    >
      {loading ? (
        <CircularProgress
          size={20}
          color="inherit"
        />
      ) : (
        children
      )}
    </Button>
  );
};

export default PrimaryButton;