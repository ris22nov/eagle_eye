import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import GlobalStyle from './GlobalStyle';
import { CssBaseline } from '@mui/material';
import { AuthProvider } from './context/AuthProvider';


const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
    <GlobalStyle />
    <CssBaseline />
  </React.StrictMode>
);
