import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import bookingStyles from "./Booking.module.css";
import { fetchRooms, fetchRoomStatusForDay } from '../../api/bookingApi';
import { getStartOfWeek, getWeekDays, formatDateRange } from '../../utils/dateUtils';

function Booking() {
    const navigate = useNavigate();
    const [currentDate, setCurrentDate] = useState(getStartOfWeek(new Date()));
    const [rooms, setRooms] = useState([]);
    const [occupiedRooms, setOccupiedRooms] = useState([]);
    const [stats, setStats] = useState({ foglalt: 0, szabad: 0 });

    const handleNewBooking = () => {
        navigate('/ujfoglalas');
    };

    // Szobák lekérdezése (összes szoba)
    useEffect(() => {
        fetchRooms()
            .then(setRooms)
            .catch((error) => console.error("Hiba történt a szobák adatainak lekérésekor:", error));
    }, []);

    // Napi foglaltsági adatok lekérdezése és statisztikai mezők frissítése
    useEffect(() => {
        fetchRoomStatusForDay(currentDate)
            .then((data) => {
                setOccupiedRooms(data.occupiedRooms || []);
                const foglalt = data.occupiedRooms ? data.occupiedRooms.length : 0;
                const szabad = data.availableRooms ? data.availableRooms.length : 0;
                setStats({ foglalt, szabad });
            })
            .catch((error) => console.error("Hiba történt a szobastátusz adatainak lekérésekor:", error));
    }, [currentDate]);

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

    const year = currentDate.getFullYear();
    const weekDays = getWeekDays(currentDate);
    const formattedDateRange = formatDateRange(weekDays[0], weekDays[6]);

    return (
        <div className={bookingStyles['booking-content']}>
            <div className={`${bookingStyles['header']} d-flex align-items-center justify-content-between`}>
                <Button variant="success" onClick={handleNewBooking} style={{ width: '180px', whiteSpace: 'nowrap', textAlign: 'center' }}>
                    Új foglalás
                </Button>

                <div className="d-flex align-items-center">
                    <Button variant="primary" className="me-2" style={{ width: '180px', whiteSpace: 'nowrap', textAlign: 'center' }} onClick={handlePreviousWeek}>
                        Előző hét
                    </Button>
                    <div className="text-center ms-3">
                        <div className={bookingStyles['year']}>{year}</div>
                        <div>{formattedDateRange}</div>
                    </div>
                    <Button variant="primary" className="ms-3" style={{ width: '180px', whiteSpace: 'nowrap', textAlign: 'center' }} onClick={handleNextWeek}>
                        Következő hét
                    </Button>
                </div>

                <div className="d-flex align-items-center ms-3">
                    <div className={`${bookingStyles['summary-card']} text-center me-3`}>
                        <div>🛌</div>
                        <div>Foglalt</div>
                        <div className="text-primary">{stats.foglalt}</div>
                    </div>
                    <div className={`${bookingStyles['summary-card']} text-center`}>
                        <div>🛏️</div>
                        <div>Szabad</div>
                        <div className="text-success">{stats.szabad}</div>
                    </div>
                </div>
            </div>

            <div className={bookingStyles['calendar-table']}>
                <div className={bookingStyles['calendar-header']}>
                    <div className={bookingStyles['room-label']}>Szobaszám</div>
                    {weekDays.map((day, index) => (
                        <div key={index} className={bookingStyles['day-header']}>
                            {day.toLocaleDateString('hu-HU', { weekday: 'short', day: 'numeric' })}
                        </div>
                    ))}
                </div>

                {rooms.map((room) => (
                    <div key={room.roomId} className={bookingStyles['room-row']}>
                        <div className={bookingStyles['room-number']}>{room.roomNumber}</div>
                        {weekDays.map((day, index) => {
                            const isOccupied = occupiedRooms.some((r) => r.roomId === room.roomId);
                            return (
                                <div
                                    key={index}
                                    className={`${bookingStyles['empty-cell']} ${isOccupied ? bookingStyles['occupied'] : ''}`}
                                ></div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Booking;
