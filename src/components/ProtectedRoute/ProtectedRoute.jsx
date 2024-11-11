
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// eslint-disable-next-line react/prop-types
function ProtectedRoute({ children }) {
    const { isAuthenticated } = useAuth();


    // Ha nincs bejelentkezve, irányítson a /login oldalra
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    // Ha be van jelentkezve, engedélyezzük az oldal megtekintését
    return children;
}

export default ProtectedRoute;
