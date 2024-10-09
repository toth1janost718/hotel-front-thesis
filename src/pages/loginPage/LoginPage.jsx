import React from 'react';
import loginPageCSS from './../loginPage/LoginPage.module.css';

function LoginPage() {
    return (
        <div className={loginPageCSS.wrapper}>
            <div className="form-box login">
                <form action="">
                    <h1>Bejelentkezés</h1>
                    <div className={loginPageCSS.inputBox}>
                        <input type="text" placeholder="Felhasználónév"  required />
                    </div>
                    <div className={loginPageCSS.inputBox}>
                        <input type="password" placeholder="Jelszó" required />
                    </div>
                    <div className={loginPageCSS.forgotPass}>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage;