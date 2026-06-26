import { Button } from "@mui/material";

const SecondaryButton = ({
  children,
  onClick,
  type = "button",
}) => {
  return (
    <Button
      variant="outlined"
      type={type}
      onClick={onClick}
      sx={{
        borderRadius: 2,
      }}
    >
      {children}
    </Button>
  );
};

export default SecondaryButton;