import { useEffect, useMemo, useState } from "react";
import {
  CssBaseline,
  ThemeProvider,
} from "@mui/material";

import ColorModeContext from "./ColorModeContext";
import { getTheme } from "../theme/theme";

const STORAGE_KEY = "theme";

const ColorModeProvider = ({ children }) => {
  const [mode, setMode] = useState(
    () => localStorage.getItem(STORAGE_KEY) ?? "light"
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, mode);
  }, [mode]);

  const toggleColorMode = () => {
    setMode((prev) =>
      prev === "light" ? "dark" : "light"
    );
  };

  const theme = useMemo(
    () => getTheme(mode),
    [mode]
  );

  return (
    <ColorModeContext.Provider
      value={{
        mode,
        toggleColorMode,
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default ColorModeProvider;