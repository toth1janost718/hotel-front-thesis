import React from 'react';
import settingStyles from "./Settings.module.css";

function  Settings() {
    return (
        <div className={settingStyles['setting-content']}>
            <h1>Beállitások  oldal</h1>
            <p>Ez egy teszt szöveg, amely a Sidebar mellett jelenik meg.</p>
        </div>
    );
}

export default Settings;
