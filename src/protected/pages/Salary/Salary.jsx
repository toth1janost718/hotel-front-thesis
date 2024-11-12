import React from 'react';
import salaryStyles from "./Salary.module.css";

function Salary() {
    return (
        <div className={salaryStyles['salary-content']}>
            <h1>Fizetés oldal</h1>
            <p>Ez egy teszt szöveg, amely a Sidebar mellett jelenik meg.</p>
        </div>
    );
}

export default Salary;
