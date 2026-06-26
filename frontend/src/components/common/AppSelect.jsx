import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const AppSelect = ({
  label,
  value,
  onChange,
  options = [],
}) => {
  return (
    <FormControl fullWidth margin="normal" size="small">
      <InputLabel>{label}</InputLabel>

      <Select
        label={label}
        value={value}
        onChange={onChange}
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
    </FormControl>
  );
};

export default AppSelect;