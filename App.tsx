import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import {Budgets} from "./src/BudgetList/pages/Budgets";
import {Layout} from "./src/components/Layout";
import {Analytics} from "./src/BudgetList/pages/Analytics";
import Dashboard from "./src/Dashboard";

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Navigate to="/dashboard" replace/>}/>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                    <Route path="/analytics" element={<Analytics/>}/>
                    <Route path="/budgets" element={<Budgets />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default App;