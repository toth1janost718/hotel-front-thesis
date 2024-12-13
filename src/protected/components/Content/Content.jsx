import {Routes, Route, Navigate} from "react-router-dom";
import "./Content.module.css";
import ProtectedRoutes from "../../../components/ProtectedRoute/ProtectedRoute.jsx";
import Dashboard from "../../../protected/Dashboard.jsx";
import Restaurant from "../../../protected/pages/Restaurant/Restaurant.jsx";
import Booking from "../../../protected/pages/Booking/Booking.jsx";
import Employees from "../../../protected/pages/Employees/Employees.jsx";
import Billing from "../../pages/Billing/Billing.jsx";
import { useAuth } from "../../../context/AuthContext.jsx";

const Content=() => {
    const { user } = useAuth(); // Hozzáférés a bejelentkezett felhasználóhoz
    return (
        <Routes>
            <Route element={<ProtectedRoutes />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/etterem" element={<Restaurant />} />
                <Route path="/foglalas" element={<Booking />} />
                {/* HR Útvonal: Csak 1-es és 2-es RoleId esetén elérhető */}
                <Route
                    path="/HR"
                    element={
                        user && user.roleId <= 2 ? (
                            <Employees />
                        ) : (
                            <Navigate to="/dashboard" /> // Jogosulatlan hozzáférés esetén átirányítás
                        )
                    }
                />
                <Route path="/szamla" element={<Billing />} />

            </Route>
        </Routes>
    );
}

export default Content;
