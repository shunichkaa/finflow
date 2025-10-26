
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import Budgets from "./BudgetList/pages/Budgets";
import Dashboard from "./BudgetList/pages/Dashboard";
import Analytics from "./BudgetList/pages/Analytics";
import Goals from "./BudgetList/pages/Goals";
import Profile from "./BudgetList/pages/Profile";
import {Auth} from "./components/auth/Auth";
import {ProtectedRoute} from "./components/auth/ProtectedRoute";
import {Layout} from "./components/Layout";
import {OAuthCallback} from "./components/auth/OAuthCallback.tsx";
import {ErrorBoundary} from "./components/ErrorBoundary";
import NotFound from "./pages/NotFound";
import ServerError from "./pages/ServerError";

function App() {
    return (
        <BrowserRouter>
            <ErrorBoundary>
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
                        <Route
                            path="goals"
                            element={
                                <ProtectedRoute>
                                    <ErrorBoundary>
                                        <Goals/>
                                    </ErrorBoundary>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="profile"
                            element={
                                <ProtectedRoute>
                                    <ErrorBoundary>
                                        <Profile/>
                                    </ErrorBoundary>
                                </ProtectedRoute>
                            }
                        />
                    </Route>

                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </ErrorBoundary>
        </BrowserRouter>
    );
}

export default App;