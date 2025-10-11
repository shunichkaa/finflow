import React from 'react';
import ReactDOM from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App';
import {ThemeContextProvider} from "./Budgets/theme/ThemeContext.tsx";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <ThemeContextProvider>
            <CssBaseline/>
            <App/>
        </ThemeContextProvider>
    </React.StrictMode>
);