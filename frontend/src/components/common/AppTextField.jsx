import { TextField } from "@mui/material";

const AppTextField = (props) => {
  return (
    <TextField
      fullWidth
      size="small"
      margin="normal"
      {...props}
    />
  );
};

export default AppTextField;