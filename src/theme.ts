import { createTheme } from "@mui/material";

export default createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#12ab12',
    },
  },
  colorSchemes: {
    dark: true,
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: ({theme}) => ({
          paddingLeft: 0,
          paddingRight: 0,
          backgroundColor: theme.palette.mode === 'light' ? '#eee' : '#333',
        }),
      },
    },
  },
});