import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/loginPage/LoginPage.jsx';
import Dashboard from "./protected/Dashboard.jsx";
import ProtectedRoutes from './components/ProtectedRoute/ProtectedRoute.jsx'
import Restaurant from "./protected/pages/Restaurant/Restaurant.jsx";
import Booking from "./protected/pages/Booking/Booking.jsx";
import Employees from "./protected/pages/Employees/Employees.jsx"
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
                <Route path="/etterem" element={<Restaurant />} />
                <Route path="/foglalaskezeles" element={<Booking />} />
                <Route path="/fooldal" element={<Dashboard />} />
                <Route path="/HR" element={<Employees />} />
                <Route path="/beallitas" element={<Settings />} />
                <Route path="/ujfoglalas" element={<CreateBooking />} />

            </Route>
        </Routes>
    );
};

export default AppRoutes;