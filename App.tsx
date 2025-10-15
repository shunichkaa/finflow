import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import Budgets from "./src/BudgetList/pages/Budgets";
import {Layout} from "./src/components/Layout";
import Dashboard from "./src/BudgetList/pages/Dashboard.tsx";
import Analytics from "./src/BudgetList/pages/Analytics.tsx";

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Navigate to="/dashboard" replace/>}/>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/budgets" element={<Budgets/>}/>
                    <Route path="*" element={<Navigate to="/dashboard" replace/>}/>
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default App;