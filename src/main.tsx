import ReactDOM from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import Dashboard from './Dashboard.tsx';
import {ThemeContextProvider} from './Budgets/theme/ThemeProvider';
import './i18n/config';
import {useInitial} from "./dev";

const initial = useInitial(); 

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ThemeContextProvider>
        <CssBaseline />
        <Dashboard initial={initial} />
    </ThemeContextProvider>
);