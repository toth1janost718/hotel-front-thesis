import React, { useState, useEffect } from 'react';
import restaurantStyles from './Restaurant.module.css';
import config from '../../../../config.js';

function Restaurant() {
    const [rooms, setRooms] = useState([]);
    const [mealPlans, setMealPlans] = useState({});

    // Szobák adatainak lekérése az API-ból
    useEffect(() => {
        fetch(`${config.bookingApiBaseUrl}/api/Room`)
            .then((response) => response.json())
            .then((data) => {
                setRooms(data);
            })
            .catch((error) => {
                console.error("Hiba történt a szobák adatainak lekérésekor:", error);
            });
    }, []);

    // Étkezési tervek lekérése a BookingManage API-ból
    useEffect(() => {
        fetch(`http://localhost:5086/api/BookingManage`)
            .then((response) => response.json())
            .then((data) => {
                const mealPlanMapping = {};
                data.forEach((booking) => {
                    const roomId = booking.roomId;
                    if (booking.mealPlan) {

                        const mealOption = booking.mealPlan.mealOption;
                        mealPlanMapping[roomId] = mealOption;
                    }
                });
                setMealPlans(mealPlanMapping);
            })
            .catch((error) => {
                console.error("Hiba történt a foglalási adatok lekérésekor:", error);
            });
    }, []);


    const getRoomColor = (roomId) => {
        const mealOption = mealPlans[roomId];
        if (!mealOption) return 'white';

        if (mealOption === "Reggeli") return restaurantStyles.breakfast;
        if (mealOption === "Félpanzió") return restaurantStyles.halfBoard;
        if (mealOption === "Teljes ellátás") return restaurantStyles.fullBoard;

        return 'white';
    };

    return (
        <div className={restaurantStyles['restaurant-content']}>
            <div className={restaurantStyles.container}>
                <h2 className={restaurantStyles.title}>Éttermi fogyasztás rögzítése</h2>

                <div className={restaurantStyles.services}>
                    <div className={restaurantStyles.serviceItem}>
                        <div className={`${restaurantStyles.icon} ${restaurantStyles.breakfast}`}></div>
                        <span>Reggeli</span>
                    </div>
                    <div className={restaurantStyles.serviceItem}>
                        <div className={`${restaurantStyles.icon} ${restaurantStyles.halfBoard}`}></div>
                        <span>Félpanzió</span>
                    </div>
                    <div className={restaurantStyles.serviceItem}>
                        <div className={`${restaurantStyles.icon} ${restaurantStyles.fullBoard}`}></div>
                        <span>Teljes ellátás</span>
                    </div>
                </div>

                <div className={restaurantStyles.iconGrid}>
                    {rooms.map((room) => (
                        <div key={room.roomId} className={restaurantStyles.roomIcon}>
                            <div className={`${restaurantStyles.icon} ${getRoomColor(room.roomId)}`}></div>
                            <span className={restaurantStyles.roomNumber}>{room.roomNumber}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Restaurant;
