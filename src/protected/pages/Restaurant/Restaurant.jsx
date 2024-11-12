import React from 'react';
import restaurantStyles from "./Restaurant.module.css";

function Restaurant() {
    return (
        <div className={restaurantStyles['restaurant-content']}>
            <h1>Étterem oldal</h1>
            <p>Ez egy teszt szöveg, amely a Sidebar mellett jelenik meg.</p>
        </div>
    );
}

export default Restaurant;
