import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Navigáció
import { fetchRoomStatuses } from "../../api/bookingApi";
import styles from "./Booking.module.css";

const Booking = () => {
    const [rooms, setRooms] = useState([]);
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
    const navigate = useNavigate();

    useEffect(() => {
        const getRoomStatuses = async () => {
            try {
                const data = await fetchRoomStatuses(
                    date === new Date().toISOString().split("T")[0] ? "today" : date
                );
                setRooms(data);
            } catch (error) {
                console.error("Hiba az API hívás során:", error);
            }
        };

        getRoomStatuses();
    }, [date]);

    const formatRoomNumber = (roomNumber) => {
        return roomNumber.toString().padStart(3, "0");
    };

    const handleRoomClick = (room) => {
        if (room.status === "Szabad") {
            navigate("/ujfoglalas");
        }
    };

    return (
        <div className={styles.bookingPageContent}>
            <div className={styles.bookingHeader}>
                <h1 className={styles.bookingTitle}>Szoba Státusz</h1>
                <div className={styles.datePickers}>
                    <div className={styles.datePickerContainer}>
                        <label htmlFor="startDate" className={styles.dateLabel}>Kezdet</label>
                        <input
                            id="startDate"
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className={styles.bookingDatePicker}
                        />
                    </div>
                    <div className={styles.datePickerContainer}>
                        <label htmlFor="endDate" className={styles.dateLabel}>Vége</label>
                        <input
                            id="endDate"
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className={styles.bookingDatePicker}
                        />
                    </div>
                </div>
            </div>

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
