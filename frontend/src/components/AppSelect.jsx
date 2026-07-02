import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

const AppSelect = ({
  label,
  value,
  onChange,
  name,
  inputRef,
  error = false,
  helperText = "",
  options = [],
}) => {
  return (
    <FormControl
      fullWidth
      margin="normal"
      size="small"
      error={error}
    >
      <InputLabel>{label}</InputLabel>

      <Select
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        inputRef={inputRef}
      >
        {options.map((item) => (
          <MenuItem
            key={item.value}
            value={item.value}
          >
            {item.label}
          </MenuItem>
        ))}
      </Select>

      <FormHelperText>
        {helperText}
      </FormHelperText>
    </FormControl>
  );
};

export default AppSelect;