import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import Budgets from "./src/BudgetList/pages/Budgets";
import Dashboard from "./src/BudgetList/pages/Dashboard";
import Analytics from "./src/BudgetList/pages/Analytics";
import {Auth} from "./src/components/auth/Auth";
import {ProtectedRoute} from "./src/components/auth/ProtectedRoute";
import {Layout} from "./src/components/Layout";
import {OAuthCallback} from "./src/components/auth/OAuthCallback.tsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Auth/>}/>
                <Route path="/oauth-callback" element={<OAuthCallback/>}/>

                <Route path="/" element={<Layout defaultSidebarOpen={true}/>}>
                    <Route index element={<Navigate to="/dashboard" replace/>}/>
                    <Route
                        path="dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard/>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="analytics"
                        element={
                            <ProtectedRoute>
                                <Analytics/>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="budgets"
                        element={
                            <ProtectedRoute>
                                <Budgets/>
                            </ProtectedRoute>
                        }
                    />
                </Route>

                <Route path="*" element={<Navigate to="/dashboard" replace/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;