
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { Layout } from './components/Layout';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { Auth } from './components/auth/Auth';
import Dashboard from './BudgetList/pages/Dashboard';
import Analytics from './BudgetList/pages/Analytics';
import Budgets from './BudgetList/pages/Budgets';
import Profile from './BudgetList/pages/Profile';
import NotFound from './pages/NotFound';
import ServerError from './pages/ServerError';
import { ErrorBoundary } from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <CssBaseline />
        <Routes>
          <Route path="/login" element={<Auth />} />
          <Route path="/error" element={<ServerError />} />
          <Route path="/*" element={
            <ProtectedRoute>
              <Layout>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/budgets" element={<Budgets />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Layout>
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
