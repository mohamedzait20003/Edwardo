import type { ReactNode } from 'react';
import { useLocation, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';

import type { RootState } from '../store';

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const location = useLocation();
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);

    if (!isAuthenticated && !location.pathname.startsWith("/Home")) {
        return <Navigate to="/Home" replace />;
    }

    return children;
}

export default ProtectedRoute;