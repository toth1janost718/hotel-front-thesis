import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import bookingStyles from "./Booking.module.css";

function Booking() {
    // Az aktuális hét első napjára állítjuk a kezdő dátumot
    const getStartOfWeek = (date) => {
        const startOfWeek = new Date(date);
        const dayOfWeek = startOfWeek.getDay();
        const diff = startOfWeek.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // Hétfő az első nap
        startOfWeek.setDate(diff);
        return startOfWeek;
    };

    const [currentDate, setCurrentDate] = useState(getStartOfWeek(new Date()));
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
            {/* Fejléc gombokkal, dátum kijelzéssel és összesítő kártyákkal */}
            <div className={`${bookingStyles['header']} d-flex align-items-center justify-content-between`}>
                <Button
                    variant="success"
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

                {/* Összesítő kártyák */}
                <div className="d-flex align-items-center ms-3">
                    <div className={`${bookingStyles['summary-card']} text-center me-3`}>
                        <div>🛏️</div> {/* Ide jön majd az "Üres" ikon */}
                        <div>Üres</div>
                        <div className="text-warning">0</div>
                    </div>
                    <div className={`${bookingStyles['summary-card']} text-center me-3`}>
                        <div>🛌</div> {/* Ide jön majd a "Foglalt" ikon */}
                        <div>Foglalt</div>
                        <div className="text-primary">0</div>
                    </div>
                    <div className={`${bookingStyles['summary-card']} text-center me-3`}>
                        <div>📅</div> {/* Ide jön majd az "Előjegyzett" ikon */}
                        <div>Előjegyzett</div>
                        <div className="text-success">0</div>
                    </div>
                    <div className={`${bookingStyles['summary-card']} text-center`}>
                        <div>⚠️</div> {/* Ide jön majd a "Rossz" ikon */}
                        <div>Rossz</div>
                        <div className="text-danger">0</div>
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
