import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import {useAuth} from "../../Budgets/hooks/useAuth.ts";

interface Props {
    children: ReactNode;
}

export const ProtectedRoute = ({ children }: Props) => {
    const { session, loading } =    useAuth();

    if (loading) return <p>Загрузка...</p>;
    if (!session) return <Navigate to="/login" replace />;

    return <>{children}</>;
};