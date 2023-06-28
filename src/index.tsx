import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeProvider } from '@mui/material/styles';
import theme from './styles/theme';
import reportWebVitals from './reportWebVitals';
import { setupStore } from './store/store';
import { Provider } from 'react-redux';
import './styles/fonts/Archivo_Black/ArchivoBlack-Regular.ttf';
import './styles/fonts/Sarala/Sarala-Bold.ttf';
import './styles/fonts/Sarala/Sarala-Regular.ttf';

//import AppContext from './components/context/appContext';
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={setupStore()}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();
