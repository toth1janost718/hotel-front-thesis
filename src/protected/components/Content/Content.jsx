
import { Routes, Route } from "react-router-dom";
import "./Content.module.css";
import ProtectedRoutes from "../../../components/ProtectedRoute/ProtectedRoute.jsx";
import Dashboard from "../../../protected/Dashboard.jsx";
import Restaurant from "../../../protected/pages/Restaurant/Restaurant.jsx";
import Booking from "../../../protected/pages/Booking/Booking.jsx";
import Employees from "../../../protected/pages/Employees/Employees.jsx";
import Settings from "../../../protected/pages/Settings/Settings.jsx";


function Content() {
    return (
        <Routes>
            <Route element={<ProtectedRoutes />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/etterem" element={<Restaurant />} />
                <Route path="/foglalas" element={<Booking />} />
                <Route path="/HR" element={<Employees />} />
                <Route path="/beallitas" element={<Settings />} />
            </Route>
        </Routes>
    );
}

export default Content;
