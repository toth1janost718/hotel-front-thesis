import React from 'react';
import bookingStyles from "./Booking.module.css";


function Booking() {
    return (
        <div className={bookingStyles['booking-content']}>
            <h1>Foglalás oldal</h1>
            <p>Ez egy teszt szöveg, amely a Sidebar mellett jelenik meg.</p>
        </div>
    );
}

export default Booking;
