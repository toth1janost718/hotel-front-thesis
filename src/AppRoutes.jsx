import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/loginPage/LoginPage.jsx';


const AppRoutes = () => {
    return (
        <Routes>
            {/* Főoldal */}
            <Route path="/" element={<HomePage />} />
            {/* Bejelentkezési oldal */}
            <Route path="/login" element={<LoginPage />} />
            {/* A védett oldalak most a Content-ben vannak kezelve */}
        </Routes>
    );
};

export default AppRoutes;