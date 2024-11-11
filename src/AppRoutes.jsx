import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/loginPage/LoginPage.jsx';
import Dashboard from "./protected/Dashboard.jsx";
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx'

const AppRoutes = () => {
    return (
        <Routes>
             {/* Főoldal */}
            <Route path="/" element={<HomePage />} />
            {/* Bejelentkezési oldal */}
             <Route path="/login" element={<LoginPage />} />
             {/* Védett oldalak */}
            <Route
                 path="/dashboard"
                 element={
                 <ProtectedRoute>
                  <Dashboard />
                 </ProtectedRoute>
        }
            />
        </Routes>
    );
};

export default AppRoutes;