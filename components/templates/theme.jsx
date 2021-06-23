import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "tailwind.config.js";
import { createTheme, ThemeProvider } from "@material-ui/core";

const config = resolveConfig(tailwindConfig);

const theme = createTheme({
  breakpoints: {
    values: {
      sm: config.theme.screens.sm.match(/\d+/g),
      md: config.theme.screens.md.match(/\d+/g),
      lg: config.theme.screens.lg.match(/\d+/g),
      xl: config.theme.screens.xl.match(/\d+/g),
    },
  },
  palette: {
    primary: {
      main: config.theme.colors.gold.darker,
    },
  },
  components: {
    MuiMenuItem: {
      styleOverrides: {
        root: {
          padding: 0,
          "&:hover": {
            backgroundColor: "transparent",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          padding: config.theme.padding[2],
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
      },
    },
  },
});

export default function Theme({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
