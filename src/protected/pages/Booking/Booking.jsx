import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchRoomStatuses } from "../../api/bookingApi";
import styles from "./Booking.module.css";


const formatDate = (date) => {
    const months = [
        "Január", "Február", "Március", "Április", "Május", "Június",
        "Július", "Augusztus", "Szeptember", "Október", "November", "December"
    ];
    const days = ["Vasárnap", "Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat"];
    const d = new Date(date);
    return `${d.getFullYear()}. ${months[d.getMonth()]} ${d.getDate()}. ${days[d.getDay()]}`;
};

const Booking = () => {
    const [rooms, setRooms] = useState([]);
    const [date, setDate] = useState(new Date());
    const navigate = useNavigate();

    useEffect(() => {
        const getRoomStatuses = async () => {
            try {
                const formattedDate = date.toISOString().split("T")[0];
                const data = await fetchRoomStatuses(formattedDate);
                setRooms(data);
            } catch (error) {
                console.error("Hiba az API hívás során:", error);
            }
        };

        getRoomStatuses();
    }, [date]);

    const handleNextDay = () => {
        setDate((prevDate) => new Date(prevDate.setDate(prevDate.getDate() + 1)));
    };

    const handlePreviousDay = () => {
        setDate((prevDate) => new Date(prevDate.setDate(prevDate.getDate() - 1)));
    };

    const formatRoomNumber = (roomNumber) => {
        return roomNumber.toString().padStart(3, "0");
    };

    const handleRoomClick = (room) => {
        if (room.status === "Szabad") {
            navigate("/ujfoglalas");
        }
    };

    const handleNewBooking = () => {
        navigate("/ujfoglalas"); // Navigálás az "Új foglalás" oldalra
    };

    return (
        <div className={styles.bookingPageContent}>
            <div className={styles.bookingHeader}>
                {/* Új foglalás gomb */}
                <button className={styles.newBookingButton} onClick={handleNewBooking}>
                    Új foglalás
                </button>

                {/* Cím középre */}
                <h1 className={styles.bookingTitle}>Szoba Státusz</h1>

                {/* Dátum választás */}
                <div className={styles.dateDisplay}>
                    <span className={styles.dateButton} onClick={handlePreviousDay}>
                        &#x25C0;
                    </span>
                    <span className={styles.currentDate}>{formatDate(date)}</span>
                    <span className={styles.dateButton} onClick={handleNextDay}>
                        &#x25B6;
                    </span>
                </div>
            </div>

            {/* Szobák megjelenítése */}
            <div className={styles.bookingRoomsGrid}>
                {rooms.length > 0 ? (
                    rooms.map((room) => (
                        <div
                            key={room.roomId}
                            className={`${styles.bookingRoomCard} ${
                                room.status === "Foglalt" ? styles.disabledRoom : ""
                            }`}
                            onClick={() => handleRoomClick(room)}
                        >
                            <h3>Szoba {formatRoomNumber(room.roomNumber)}</h3>
                            <div
                                className={`${styles.bookingStatusBox} ${
                                    room.status === "Szabad"
                                        ? styles.bookingFree
                                        : styles.bookingOccupied
                                }`}
                            >
                                {room.status}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Nincsenek elérhető szobák!</p>
                )}
            </div>
        </div>
    );
};

export default Booking;
