import React from 'react';
import employeeStyles from "./Employees.module.css";

function Accountant() {
    return (
        <div className={employeeStyles['employee-content']}>
            <h1>Alkalmazottak oldal</h1>
            <p>Ez egy teszt szöveg, amely a Sidebar mellett jelenik meg.</p>
        </div>
    );
}

export default Accountant;
