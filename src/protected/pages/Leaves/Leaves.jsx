import React from 'react';
import leaveStyles from "./Leaves.module.css";

function Leaves() {
    return (
        <div className={leaveStyles['leave-content']}>
            <h1>Szabadság oldal</h1>
            <p>Ez egy teszt szöveg, amely a Sidebar mellett jelenik meg.</p>
        </div>
    );
}

export default Leaves;
