import { createTheme } from '@mui/material/styles';
const theme = createTheme({
  typography: {
    fontSize: 10,
    fontFamily: 'Roboto',
    htmlFontSize: 12,
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#4DD21D',
      light: '#8ee16f',
      dark: '#007600',
      contrastText: '#171E27',
    },
    secondary: {
      main: '#333f48',
      light: '#ced4d9',
      dark: '#222b31',
      contrastText: '#eceef0',
    },
  },
});

export default theme;
