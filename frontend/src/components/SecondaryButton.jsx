import { Button } from "@mui/material";
import styles from "./Styles";

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
      sx={styles.secondarybutton}
    >
      {children}
    </Button>
  );
};

export default SecondaryButton;