import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import bookingStyles from "./Booking.module.css";

function Booking() {
    const [currentDate, setCurrentDate] = useState(new Date(2024, 1, 6));
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        fetch("https://localhost:7107/api/Room")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Hiba történt a szobák betöltése közben");
                }
                return response.json();
            })
            .then((data) => {
                setRooms(data);
            })
            .catch((error) => {
                console.error("Hiba:", error);
            });
    }, []);

    const handleNextWeek = () => {
        const nextWeek = new Date(currentDate);
        nextWeek.setDate(currentDate.getDate() + 7);
        setCurrentDate(nextWeek);
    };

    const handlePreviousWeek = () => {
        const previousWeek = new Date(currentDate);
        previousWeek.setDate(currentDate.getDate() - 7);
        setCurrentDate(previousWeek);
    };

    const getWeekDays = () => {
        const startOfWeek = new Date(currentDate);
        const days = [];
        for (let i = 0; i < 7; i++) {
            const day = new Date(startOfWeek);
            day.setDate(startOfWeek.getDate() + i);
            days.push(day);
        }
        return days;
    };

    const year = currentDate.getFullYear();
    const formattedDateRange = `${getWeekDays()[0].toLocaleDateString('hu-HU', { month: 'long', day: 'numeric' })} - ${getWeekDays()[6].toLocaleDateString('hu-HU', { month: 'long', day: 'numeric' })}`;

    return (
        <div className={bookingStyles['booking-content']}>

            <div className={bookingStyles['header']}>
                <Button variant="primary" onClick={handlePreviousWeek}>Előző</Button>
                <div>
                    <div className={bookingStyles['year']}>{year}</div>
                    <div>{formattedDateRange}</div>
                </div>
                <Button variant="primary" onClick={handleNextWeek}>Következő</Button>
            </div>

            <div className={bookingStyles['calendar-table']}>
                <div className={bookingStyles['calendar-header']}>
                    <div className={bookingStyles['room-label']}>Szobaszám</div>
                    {getWeekDays().map((day, index) => (
                        <div key={index} className={bookingStyles['day-header']}>
                            {day.toLocaleDateString('hu-HU', { weekday: 'short', day: 'numeric' })}
                        </div>
                    ))}
                </div>

                {rooms.map((room) => (
                    <div key={room.roomId} className={bookingStyles['room-row']}>
                        <div className={bookingStyles['room-number']}>{room.roomNumber}</div>
                        {getWeekDays().map((_, index) => (
                            <div key={index} className={bookingStyles['empty-cell']}></div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Booking;
