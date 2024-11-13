import React from 'react';
import "./CreateBooking.module.css"
import createbookStyles from "../CreateBooking/CreateBooking.module.css";

function CreateBooking() {
    return (<div className={createbookStyles['create-booking-content']}>
        <h1>Létrehozó oldal</h1>
        <p>Ez egy teszt szöveg, amely a Sidebar mellett jelenik meg.</p>
    </div>)
}

export default CreateBooking;