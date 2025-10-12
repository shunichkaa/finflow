import ReactDOM from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App';
import {ThemeContextProvider} from './Budgets/theme/ThemeProvider';
import './i18n/config';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ThemeContextProvider>
        <CssBaseline/>
        <App/>
    </ThemeContextProvider>
);