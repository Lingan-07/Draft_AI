import { TextField } from "@mui/material";

const AppTextArea = (props) => {
  return (
    <TextField
      fullWidth
      multiline
      rows={6}
      margin="normal"
      {...props}
    />
  );
};

export default AppTextArea;