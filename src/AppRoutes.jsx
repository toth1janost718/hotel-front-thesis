import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/loginPage/LoginPage.jsx';

const AppRoutes = () => {
    return (
        <Routes>
            {/* Főoldal */}
            <Route path="/" element={<HomePage />} />
            {/* További oldalak */}
            <Route path="/login" element={<LoginPage />} />
        </Routes>
    );
};

export default AppRoutes;