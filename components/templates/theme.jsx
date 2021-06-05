import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "tailwind.config.js";
import { createTheme, ThemeProvider } from "@material-ui/core";

const config = resolveConfig(tailwindConfig);

const theme = createTheme({
  palette: {
    primary: {
      main: config.theme.colors.gold.darker,
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          padding: config.theme.padding[2],
          background: "white",
          border: "1px solid #292929",
          borderRadius: 2,
        },
      },
    },
  },
});

export default function Theme({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
