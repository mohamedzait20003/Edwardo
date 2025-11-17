import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
import type { RootState } from '../store';

const RedirectRoute = () => {
    const location = useLocation();
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);    

    if(isAuthenticated && !location.pathname.startsWith('/Dashboard')) {
        return <Navigate to="/Dashboard" replace />;
    }

    if(!isAuthenticated) {
        return <Navigate to="/Home" replace />;
    }
};

export default RedirectRoute;