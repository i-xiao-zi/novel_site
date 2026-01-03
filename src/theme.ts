import { createTheme, type Theme } from "@mui/material";

const theme: Theme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#12ab12',
    },
  },
  colorSchemes: {
    dark: false,
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: 0,
          paddingRight: 0,
        },
      },
    },
  },
});

export default theme