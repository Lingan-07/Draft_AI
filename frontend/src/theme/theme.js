import { createTheme } from "@mui/material/styles";

export const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,

      primary: {
        main: "#2563EB",
      },

      secondary: {
        main: "#7C3AED",
      },

      background: {
        default:
          mode === "light"
            ? "#F5F7FB"
            : "#0F172A",

        paper:
          mode === "light"
            ? "#FFFFFF"
            : "#1E293B",
      },
    },

    shape: {
      borderRadius: 12,
    },

    typography: {
      fontFamily:
        '"Inter","Roboto","Helvetica","Arial",sans-serif',

      h3: {
        fontWeight: 700,
      },

      h4: {
        fontWeight: 700,
      },

      h5: {
        fontWeight: 700,
      },

      h6: {
        fontWeight: 700,
      },

      button: {
        textTransform: "none",
        fontWeight: 600,
      },
    },
  });