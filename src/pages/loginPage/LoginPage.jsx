import React from 'react';
import loginPageCSS from './../loginPage/LoginPage.module.css';
import {FaUser,FaLock} from 'react-icons/fa';
import {useEffect} from "react";


function LoginPage() {
    useEffect(() => {
        document.body.classList.add('login-body');

        return () => {
            document.body.classList.remove('login-body');
        };
    }, []);
    return (
        <div className={loginPageCSS.wrapper}>
            <div className="form-box login">
                <form action="">
                    <h1>Bejelentkezés</h1>
                    <div className={loginPageCSS.inputBox}>
                        <input type="text" placeholder="Felhasználónév"  required />
                        <FaUser className={loginPageCSS.icon}/>
                    </div>
                    <div className={loginPageCSS.inputBox}>
                        <input type="password" placeholder="Jelszó" required />
                        <FaLock className={loginPageCSS.icon}/>
                    </div>
                    <div className={loginPageCSS.forgotPass}>
                        <a href="">Elfelejtette a jelszavát?</a>
                    </div>
                    <button type="submit" className={loginPageCSS.loginButton}>Bejelentkezés</button>

                </form>
            </div>
        </div>
    )
}

export default LoginPage;