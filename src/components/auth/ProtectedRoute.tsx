import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import {useAuth} from "../../Budgets/hooks/useAuth.ts";

interface Props {
    children: ReactNode;
}

export const ProtectedRoute = ({ children }: Props) => {
    const { session, loading, error } = useAuth();

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                fontSize: '18px',
                color: '#272B3E'
            }}>
                Загрузка...
            </div>
        );
    }

    if (error) {
        console.error('Auth error in ProtectedRoute:', error);
        return <Navigate to="/login" replace />;
    }

        if (!session) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};