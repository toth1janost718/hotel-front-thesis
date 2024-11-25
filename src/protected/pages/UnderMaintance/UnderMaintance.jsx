import React from 'react';
import underMainstyles from "../UnderMaintance/UnderMaintance.module.css";



function UnderMaintance() {
    return (
        <div className={underMainstyles['create-booking-content']}>
            <div className={underMainstyles['animated-wrapper']}>
                <div className={underMainstyles['logo-container']}>
                    <div className={underMainstyles['hotel-icon']}></div>
                </div>
                <h1 className={underMainstyles['maintenance-title']}>Hamarosan</h1>
                <p className={underMainstyles['maintenance-text']}>
                    A Hotelmenedzsment alkalmazás ezen része fejlesztés alatt.
                </p>
                <div className={underMainstyles['loader']}></div>
            </div>
        </div>
    )
}


export default UnderMaintance;
