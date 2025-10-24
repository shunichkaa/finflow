import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./App.tsx";
import './i18n/config';
import { ThemeContextProvider } from './Budgets/theme/ThemeProvider';

// Необходимо для совместимости с некоторыми библиотеками
// которые ожидают глобальный React (MUI, Recharts и др.)
if (typeof window !== 'undefined') {
    (window as any).React = React;
}

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