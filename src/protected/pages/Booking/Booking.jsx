import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import bookingStyles from "./Booking.module.css";
import config from '../../../../config.js';


function Booking() {
    const navigate = useNavigate();
    const [currentDate, setCurrentDate] = useState(getStartOfWeek(new Date()));
    const [rooms, setRooms] = useState([]);
    const [summary, setSummary] = useState({
        ures: 0,
        foglalt: 0,
        elojegyzett: 0,
        rossz: 0
    });
    const [bookings, setBookings] = useState([]);

    function getStartOfWeek(date) {
        const startOfWeek = new Date(date);
        const dayOfWeek = startOfWeek.getDay();
        const diff = startOfWeek.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // Hétfő az első nap
        startOfWeek.setDate(diff);
        return startOfWeek;
    }
    const handleNewBooking = () => {
        navigate('/ujfoglalas');
    };

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

    useEffect(() => {
        fetch(`${config.bookingApiBaseUrl}/api/RoomStatus`)
            .then((response) => response.json())
            .then((data) => {
                const newSummary = {
                    ures: 0,
                    foglalt: 0,
                    elojegyzett: 0,
                    rossz: 0
                };

                data.forEach((room) => {
                    if (room.status === "Szabad") newSummary.ures += 1;
                    else if (room.status === "Foglalt") newSummary.foglalt += 1;
                    else if (room.status === "Előjegyzett") newSummary.elojegyzett += 1;
                    else if (room.status === "Rossz") newSummary.rossz += 1;
                });

                setSummary(newSummary);
            })
            .catch((error) => {
                console.error("Hiba történt a szobastátusz adatainak lekérésekor:", error);
            });
    }, []);

    // Foglalások lekérése a BookingManage API-ból
    useEffect(() => {
        fetch(`${config.bookingApiBaseUrl}/api/BookingManage`)
            .then((response) => response.json())
            .then((data) => {
                const filteredBookings = data.filter((booking) => booking.bookingStatus === "Foglalt");
                setBookings(filteredBookings);
            })
            .catch((error) => {
                console.error("Hiba történt a foglalások adatainak lekérésekor:", error);
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

    const isDateInRange = (date, checkIn, checkOut) => {
        return date >= new Date(checkIn) && date <= new Date(checkOut);
    };

    const year = currentDate.getFullYear();
    const formattedDateRange = `${getWeekDays()[0].toLocaleDateString('hu-HU', { month: 'long', day: 'numeric' })} - ${getWeekDays()[6].toLocaleDateString('hu-HU', { month: 'long', day: 'numeric' })}`;

    return (
        <div className={bookingStyles['booking-content']}>
            <div className={`${bookingStyles['header']} d-flex align-items-center justify-content-between`}>
                <Button
                    variant="success"
                    onClick={handleNewBooking}
                    style={{ width: '180px', whiteSpace: 'nowrap', textAlign: 'center' }}
                >
                    Új foglalás
                </Button>

                <div className="d-flex align-items-center">
                    <Button
                        variant="primary"
                        className="me-2"
                        style={{ width: '180px', whiteSpace: 'nowrap', textAlign: 'center' }}
                        onClick={handlePreviousWeek}
                    >
                        Előző hét
                    </Button>
                    <div className="text-center ms-3">
                        <div className={bookingStyles['year']}>{year}</div>
                        <div>{formattedDateRange}</div>
                    </div>
                    <Button
                        variant="primary"
                        className="ms-3"
                        style={{ width: '180px', whiteSpace: 'nowrap', textAlign: 'center' }}
                        onClick={handleNextWeek}
                    >
                        Következő hét
                    </Button>
                </div>

                <div className="d-flex align-items-center ms-3">
                    <div className={`${bookingStyles['summary-card']} text-center me-3`}>
                        <div>🛏️</div>
                        <div>Üres</div>
                        <div className="text-warning">{summary.ures}</div>
                    </div>
                    <div className={`${bookingStyles['summary-card']} text-center me-3`}>
                        <div>🛌</div>
                        <div>Foglalt</div>
                        <div className="text-primary">{summary.foglalt}</div>
                    </div>
                    <div className={`${bookingStyles['summary-card']} text-center me-3`}>
                        <div>📅</div>
                        <div>Előjegyzett</div>
                        <div className="text-success">{summary.elojegyzett}</div>
                    </div>
                    <div className={`${bookingStyles['summary-card']} text-center`}>
                        <div>⚠️</div>
                        <div>Rossz</div>
                        <div className="text-danger">{summary.rossz}</div>
                    </div>
                </div>
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
                        {getWeekDays().map((day, index) => {
                            const isOccupied = bookings.some((booking) =>
                                booking.roomId === room.roomId &&
                                isDateInRange(day, booking.checkInDate, booking.checkOutDate)
                            );
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
