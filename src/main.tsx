import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./App.tsx";
import './i18n/config';
import { ThemeContextProvider } from './Budgets/theme/ThemeProvider';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <ThemeContextProvider>
            <App />
        </ThemeContextProvider>
    </React.StrictMode>
);