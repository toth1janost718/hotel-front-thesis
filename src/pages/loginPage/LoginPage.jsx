import React, { useState } from 'react';
import loginPageCSS from   './LoginPage.module.css';
import {FaUser,FaLock,FaEnvelope} from 'react-icons/fa';
import {useEffect} from "react";
import { useNavigate } from 'react-router-dom';


function LoginPage() {


    useEffect(() => {
        document.body.classList.add('login-body');

        return () => {
            document.body.classList.remove('login-body');
        };
    }, []);


    const navigate = useNavigate();

    const [action,setAction]=useState('');
    const [username, setUsername] = useState(''); // Felhasználónév állapot
    const [password, setPassword] = useState(''); // Jelszó állapot
    const [errorMessage, setErrorMessage] = useState(''); // Hibaüzenet állapot

// Navigáció a főoldalra
    const handleNavigation = () => {
        navigate("/");
    };

    const registerLink=()=>{
        setAction('active');

    };

    const loginLink=()=>{
        setAction('');

    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5172/api/UserLogin/login", {
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
                    navigate("/");
                } else {
                    setErrorMessage(data.message || "Hibás felhasználónév vagy jelszó.");
                }
            } else {
                setErrorMessage("Hiba történt a bejelentkezés során.");
            }
        } catch (error) {
            console.error("Hálózati hiba:", error);
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
                               onChange={(e) => setUsername(e.target.value)} // Felhasználónév frissítése
                               required/>
                        <FaUser className={loginPageCSS.icon}/>
                    </div>
                    <div className={loginPageCSS.inputBox}>
                        <input type="password"
                               placeholder='Jelszó'
                               value={password}
                               onChange={(e) => setPassword(e.target.value)} // Jelszó frissítése
                               required/>
                        <FaLock className={loginPageCSS.icon}/>
                    </div>
                    {/* Hibaüzenet megjelenítése, ha van */}
                    {errorMessage && <p className={loginPageCSS.error}>{errorMessage}</p>}

                    <button type='submit'>Belépés</button>
                    <div className={loginPageCSS.registerLink}>
                        <p>Elfelejtette a jelszavát? <a href="#" onClick={registerLink}> Új jelszó </a></p>
                    </div>

                </form>
                <button type='submit' onClick={handleNavigation} >Vissza a weboldalra</button>
            </div>

            <div
                className={`${loginPageCSS.formBox} ${loginPageCSS.register} ${action === 'active' ? loginPageCSS.activeRegister : ''}`}>
                <form action="">
                    <h1>Elfelejtett jelszó</h1>
                    <div className={loginPageCSS.inputBox}>
                        <input type="text" placeholder='Felhasználónév' required/>
                        <FaUser className={loginPageCSS.icon}/>
                    </div>
                    <div className={loginPageCSS.inputBox}>
                        <input type="email" placeholder='E-mail' required/>
                        <FaEnvelope className={loginPageCSS.icon}/>
                    </div>


                    <button type='submit'>Jelszó küldése</button>
                    <div className={loginPageCSS.registerLink}>
                        <p>Be szeretne jelentkezni? <a href="#" onClick={loginLink}> Belépés </a></p>
                    </div>

                </form>


            </div>
        </div>
    )
}

export default LoginPage;