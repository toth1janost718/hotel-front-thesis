import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        return JSON.parse(localStorage.getItem('user')) || null;
    });


    useEffect(() => {
        // Bejelentkezett felhasználó adatok betöltése localStorage-ból
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    const login = (userData) => {
        setUser(userData); // Felhasználói adatok mentése állapotba
        localStorage.setItem('user', JSON.stringify(userData)); // Opció: mentés localStorage-ba
    };

    const logout = () => {
        setUser(null); // Felhasználói adatok törlése
        localStorage.removeItem('user'); // LocalStorage törlése
    };

    const isAuthenticated = !!user; // Ellenőrzés: van-e bejelentkezett felhasználó

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
