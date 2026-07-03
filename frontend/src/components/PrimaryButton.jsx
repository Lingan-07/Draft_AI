import { Button, CircularProgress } from "@mui/material";
import styles from "./Styles";

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
      sx={styles.primarybutton}
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