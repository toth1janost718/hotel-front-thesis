import React from 'react';
import "./CreateBooking.module.css";
import createBookingStyles from "../CreateBooking/CreateBooking.module.css";

function CreateBooking() {
    return (
        <div className={createBookingStyles['create-booking-content']}>
            <div className={createBookingStyles['animated-wrapper']}>
                <div className={createBookingStyles['logo-container']}>
                    <div className={createBookingStyles['hotel-icon']}></div>
                </div>
                <h1 className={createBookingStyles['maintenance-title']}>Hamarosan</h1>
                <p className={createBookingStyles['maintenance-text']}>
                    A Moonlight Valley Hotel új oldalán dolgozunk. Kérjük, térjen vissza később!
                </p>
                <div className={createBookingStyles['loader']}></div>
            </div>
        </div>
    );
}

export default CreateBooking;
