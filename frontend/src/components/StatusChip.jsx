import { Chip } from "@mui/material";

const StatusChip = ({
  label,
  color = "primary",
}) => {
  return (
    <Chip
      label={label}
      color={color}
      size="small"
    />
  );
};

export default StatusChip;