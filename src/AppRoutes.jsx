import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/loginPage/LoginPage.jsx';
import Dashboard from "./protected/Dashboard.jsx";

const AppRoutes = () => {
    return (
        <Routes>
            {/* Főoldal */}
            <Route path="/" element={<HomePage />} />
            {/* További oldalak */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    );
};

export default AppRoutes;