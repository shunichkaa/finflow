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

// Регистрация Service Worker для уведомлений
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('Service Worker registered:', registration.scope);
            })
            .catch((error) => {
                console.log('Service Worker registration failed:', error);
            });
    });
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