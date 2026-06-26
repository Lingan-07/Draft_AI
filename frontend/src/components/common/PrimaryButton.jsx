import { Button } from "@mui/material";

const PrimaryButton = ({
  children,
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
      disabled={disabled}
      onClick={onClick}
      sx={{
        borderRadius: 2,
        px: 3,
        py: 1.2,
        fontWeight: 600,
      }}
    >
      {children}
    </Button>
  );
};

export default PrimaryButton;