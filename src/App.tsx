
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { Layout } from './components/Layout';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { Auth } from './components/auth/Auth';
import { OAuthCallback } from './components/auth/OAuthCallback';
import Dashboard from './BudgetList/pages/Dashboard';
import Analytics from './BudgetList/pages/Analytics';
import Budgets from './BudgetList/pages/Budgets';
import Goals from './BudgetList/pages/Goals';
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
          <Route path="/login" element={
            <Layout>
              <Auth />
            </Layout>
          } />
          <Route path="/oauth-callback" element={<OAuthCallback />} />
          <Route path="/error" element={<ServerError />} />
          <Route path="/" element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/analytics" element={
            <ProtectedRoute>
              <Layout>
                <Analytics />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/budgets" element={
            <ProtectedRoute>
              <Layout>
                <Budgets />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/goals" element={
            <ProtectedRoute>
              <Layout>
                <Goals />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Layout>
                <Profile />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="*" element={
            <ProtectedRoute>
              <Layout>
                <NotFound />
              </Layout>
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
