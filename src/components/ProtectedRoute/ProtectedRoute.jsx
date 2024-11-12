
import React from 'react';
import { Outlet,Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Sidebar  from "../../protected/components/Sidebar/Sidebar.jsx";


function ProtectedRoute() {
    const {isAuthenticated} = useAuth();


    // Ha nincs bejelentkezve, irányítson a /login oldalra
    if (!isAuthenticated) {
        return <Navigate to="/login"/>;
    }

    // Ha be van jelentkezve, engedélyezzük az oldal megtekintését
    return (
    <div style={{display: 'flex'}}>
        <Sidebar/>
        <div style={{flex: 1}}>
            <Outlet/>
        </div>
    </div>
    );
}

export default ProtectedRoute;
