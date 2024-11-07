import React, { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context';
import SkeletonLoader from './SkeletonLoader'

interface PrivateRouteProps {
    children: ReactNode;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const { isLoggedIn, loading } = useAuth();
    const { pathname } = useLocation();

    if (loading) {
        return (
            <SkeletonLoader />
        );
    }

    if (pathname === '/login' || pathname === '/signup') {
        return isLoggedIn ? <Navigate to="/" /> : <>{children}</>;
    }

    return isLoggedIn ? <>{children}</> : <Navigate to="/login" />;

};