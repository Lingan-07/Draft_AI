import SearchIcon from "@mui/icons-material/Search";
import {
  TextField,
  InputAdornment,
} from "@mui/material";

const SearchBar = (props) => {
  return (
    <TextField
      fullWidth
      size="small"
      placeholder="Search..."
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      {...props}
    />
  );
};

export default SearchBar;