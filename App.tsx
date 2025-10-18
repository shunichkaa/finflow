import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import Budgets from "./src/BudgetList/pages/Budgets";
import Dashboard from "./src/BudgetList/pages/Dashboard";
import Analytics from "./src/BudgetList/pages/Analytics";
import {Auth} from "./src/components/auth/Auth";
import {ProtectedRoute} from "./src/components/auth/ProtectedRoute";
import {Layout} from "./src/components/Layout";
import {OAuthCallback} from "./src/components/auth/OAuthCallback.tsx";
import {ErrorBoundary} from "./src/components/ErrorBoundary";
import NotFound from "./src/pages/NotFound";
import ServerError from "./src/pages/ServerError";

function App() {
    return (
        <ErrorBoundary>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Auth/>}/>
                    <Route path="/oauth-callback" element={<OAuthCallback/>}/>
                    <Route path="/error" element={<ServerError/>}/>

                    <Route path="/" element={<Layout defaultSidebarOpen={true}/>}>
                        <Route index element={<Navigate to="/dashboard" replace/>}/>
                        <Route
                            path="dashboard"
                            element={
                                <ProtectedRoute>
                                    <ErrorBoundary>
                                        <Dashboard/>
                                    </ErrorBoundary>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="analytics"
                            element={
                                <ProtectedRoute>
                                    <ErrorBoundary>
                                        <Analytics/>
                                    </ErrorBoundary>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="budgets"
                            element={
                                <ProtectedRoute>
                                    <ErrorBoundary>
                                        <Budgets/>
                                    </ErrorBoundary>
                                </ProtectedRoute>
                            }
                        />
                    </Route>

                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </BrowserRouter>
        </ErrorBoundary>
    );
}

export default App;