import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/loginPage/LoginPage.jsx';
import Dashboard from "./protected/Dashboard.jsx";
import Salary from "./protected/pages/Salary/Salary.jsx";
import ProtectedRoutes from './components/ProtectedRoute/ProtectedRoute.jsx'
import Restaurant from "./protected/pages/Restaurant/Restaurant.jsx";
import Booking from "./protected/pages/Booking/Booking.jsx";
import Accountant from "./protected/pages/Accountant/Accountant.jsx";
import Employees from "./protected/pages/Employees/Employees.jsx"
import Leaves from "./protected/pages/Leaves/Leaves.jsx";
import Settings from "./protected/pages/Settings/Settings.jsx";
import CreateBooking from "./protected/pages/Booking/CreateBooking/CreateBooking.jsx";


const AppRoutes = () => {
    return (
        <Routes>
             {/* Főoldal */}
            <Route path="/" element={<HomePage />} />
            {/* Bejelentkezési oldal */}
             <Route path="/login" element={<LoginPage />} />
             {/* Védett oldalak */}
            <Route element={<ProtectedRoutes />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/fizetes" element={<Salary />} />
                <Route path="/etterem" element={<Restaurant />} />
                <Route path="/foglalasok" element={<Booking />} />
                <Route path="/fooldal" element={<Dashboard />} />
                <Route path="/szamlazas" element={<Accountant />} />
                <Route path="/alkalmazottak" element={<Employees />} />
                <Route path="/szabadsag" element={<Leaves />} />
                <Route path="/beallitas" element={<Settings />} />
                <Route path="/ujfoglalas" element={<CreateBooking />} />


            </Route>
        </Routes>
    );
};

export default AppRoutes;