import React, { useState, useEffect } from 'react';
import loginPageCSS from './LoginPage.module.css';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import config from "../../../config.js";

function LoginPage() {
    useEffect(() => {
        document.body.classList.add('login-body');
        return () => {
            document.body.classList.remove('login-body');
        };
    }, []);

    const navigate = useNavigate();
    const { login } = useAuth();

    const [action, setAction] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    const handleNavigation = () => {
        navigate("/");
    };

    const registerLink = () => {
        setAction('active');
    };

    const loginLink = () => {
        setAction('');
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${config.hrApiBaseUrl}/api/UserLogin/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    UserName: username,
                    Password: password
                })
            });

            if (response.ok) {
                const data = await response.json();
                if (data.isSuccess) {
                    login();
                    navigate("/dashboard");
                } else {
                    setErrorMessage(data.message || "Hibás felhasználónév vagy jelszó.");
                }
            } else {
                setErrorMessage("Hiba történt a bejelentkezés során.");
            }
            // eslint-disable-next-line no-unused-vars
        } catch (error) {

            setErrorMessage("Nem sikerült kapcsolódni a szerverhez.");
        }
    };

    return (
        <div className={`${loginPageCSS.wrapper} ${action === 'active' ? loginPageCSS.active : ''}`}>
            <div
                className={`${loginPageCSS.formBox} ${loginPageCSS.login} ${action === 'active' ? loginPageCSS.activeLogin : ''}`}>
                <form onSubmit={handleLogin}>
                    <h1>Bejelentkezés</h1>
                    <div className={loginPageCSS.inputBox}>
                        <input type="text"
                               placeholder='Felhasználónév'
                               value={username}
                               onChange={(e) => setUsername(e.target.value)}
                               required />
                        <FaUser className={loginPageCSS.icon} />
                    </div>
                    <div className={loginPageCSS.inputBox}>
                        <input type="password"
                               placeholder='Jelszó'
                               value={password}
                               onChange={(e) => setPassword(e.target.value)}
                               required />
                        <FaLock className={loginPageCSS.icon} />
                    </div>

                    {errorMessage && <p className={loginPageCSS.error}>{errorMessage}</p>}

                    <button type='submit'>Belépés</button>
                    <div className={loginPageCSS.registerLink}>
                        <p>Elfelejtette a jelszavát? <a href="#" onClick={registerLink}> Új jelszó </a></p>
                    </div>
                </form>
                <button type='submit' onClick={handleNavigation}>Vissza a weboldalra</button>
            </div>

            <div
                className={`${loginPageCSS.formBox} ${loginPageCSS.register} ${action === 'active' ? loginPageCSS.activeRegister : ''}`}>
                <form action="">
                    <h1>Elfelejtett jelszó</h1>
                    <div className={loginPageCSS.inputBox}>
                        <input type="text" placeholder='Felhasználónév' required />
                        <FaUser className={loginPageCSS.icon} />
                    </div>
                    <div className={loginPageCSS.inputBox}>
                        <input type="email" placeholder='E-mail' required />
                        <FaEnvelope className={loginPageCSS.icon} />
                    </div>

                    <button type='submit'>Jelszó küldése</button>
                    <div className={loginPageCSS.registerLink}>
                        <p>Be szeretne jelentkezni? <a href="#" onClick={loginLink}> Belépés </a></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
