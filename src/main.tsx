import React from 'react';
import ReactDOM from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App';
import { ThemeContextProvider } from './Budgets/theme/ThemeProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ThemeContextProvider>
            <CssBaseline />
            <App />
        </ThemeContextProvider>
    </React.StrictMode>
);