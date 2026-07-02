import { useContext } from "react";

import {
  FormControlLabel,
  Switch,
} from "@mui/material";

import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";

import ColorModeContext from "../context/ColorModeContext";

const ThemeToggle = () => {
  const { mode, toggleColorMode } =
    useContext(ColorModeContext);

  return (
    <FormControlLabel
      control={
        <Switch
          checked={mode === "dark"}
          onChange={toggleColorMode}
          color="primary"
        />
      }
      label={
        mode === "dark" ? (
          <DarkModeRoundedIcon />
        ) : (
          <LightModeRoundedIcon />
        )
      }
      labelPlacement="start"
    />
  );
};

export default ThemeToggle;