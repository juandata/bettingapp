// .storybook/preview.js
/*
https://storybook.js.org/addons/@react-theming/storybook-addon
https://github.com/react-theming/theming-material-ui
/*
import { ThemeProvider, createMuiTheme } from '@mui/material/styles';
import { addDecorator } from '@storybook/react';
import { withThemes } from '@react-theming/storybook-addon';

import theme from '../src/styles/theme';

const providerFn = ({ theme, children }) => {
  const muTheme = createMuiTheme(theme);
  return <ThemeProvider theme={muTheme}>{children}</ThemeProvider>;
};

// pass ThemeProvider and array of your themes to decorator
addDecorator(withThemes(null, [theme], { providerFn }));
*/