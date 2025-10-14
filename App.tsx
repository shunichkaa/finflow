import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import {Dashboard} from './pages/Dashboard';
import {Analytics} from './pages/Analytics';
import {Layout} from './components/Layout';

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Navigate to="/dashboard" replace/>}/>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                    <Route path="/analytics" element={<Analytics/>}/>
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default App;