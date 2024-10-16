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
    const handleNavigation = () => {
        navigate("/"); //
    };

    const [action,setAction]=useState('');

    const registerLink=()=>{
        setAction('active');

    };

    const loginLink=()=>{
        setAction('');

    };


    return (
        <div className={`${loginPageCSS.wrapper} ${action === 'active' ? loginPageCSS.active : ''}`}>
            <div
                className={`${loginPageCSS.formBox} ${loginPageCSS.login} ${action === 'active' ? loginPageCSS.activeLogin : ''}`}>
                <form action="">
                    <h1>Bejelentkezés</h1>
                    <div className={loginPageCSS.inputBox}>
                        <input type="text"

                               placeholder='Felhasználónév'
                               required/>
                        <FaUser className={loginPageCSS.icon}/>
                    </div>
                    <div className={loginPageCSS.inputBox}>
                        <input type="password" placeholder='Jelszó' required/>
                        <FaLock className={loginPageCSS.icon}/>
                    </div>

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