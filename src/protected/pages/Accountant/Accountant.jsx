import React from 'react';
import accountantStyles from "./Accountant.module.css";

function Accountant() {
    return (
        <div className={accountantStyles['accountant-content']}>
            <h1>Számlázás oldal</h1>
            <p>Ez egy teszt szöveg, amely a Sidebar mellett jelenik meg.</p>
        </div>
    );
}

export default Accountant;
