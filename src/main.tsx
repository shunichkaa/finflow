import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./App.tsx";
import './i18n/i18n';
import { ThemeContextProvider } from './Budgets/theme/ThemeProvider';

declare global {
    interface Window {
        React?: typeof React;
    }
}

if (typeof window !== 'undefined') {
    window.React = React;
}

import { clearOldGoalsData } from './Budgets/utils/clearOldData';
clearOldGoalsData();

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