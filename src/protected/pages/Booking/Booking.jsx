import  { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchRoomTypesWithRooms } from "../../api/bookingApi";
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
    const [roomTypes, setRoomTypes] = useState([]);
    const [date, setDate] = useState(new Date());
    const navigate = useNavigate();

    useEffect(() => {
        const getRoomTypesWithRooms = async () => {
            try {
                const formattedDate = date.toISOString().split("T")[0];
                const data = await fetchRoomTypesWithRooms(formattedDate); // Új API-hívás
                setRoomTypes(data);
            } catch (error) {
                console.error("Hiba az API hívás során:", error);
            }
        };

        getRoomTypesWithRooms();
    }, [date]);

    const handleNextDay = () => {
        setDate((prevDate) => {
            const newDate = new Date(prevDate);
            newDate.setDate(newDate.getDate() + 1);
            return newDate;
        });
    };

    const handlePreviousDay = () => {
        setDate((prevDate) => {
            const newDate = new Date(prevDate);
            newDate.setDate(newDate.getDate() - 1);
            return newDate;
        });
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
        navigate("/ujfoglalas");
    };

    return (
        <div className={styles.fullyPageBody}>
            <div className={styles.bookingPageContent}>
                <div className={styles.bookingHeader}>
                    <button className={styles.newBookingButton} onClick={handleNewBooking}>
                        Új foglalás
                    </button>
                    <h1 className={styles.bookingTitle}>Foglaláskezelés</h1>
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

                {/* Szobák megjelenítése szobatípusok szerint */}
                {roomTypes.length > 0 ? (
                    roomTypes.map((roomType) => (
                        <div key={roomType.roomTypeId} className={styles.roomTypeSection}>
                            <h2 className={styles.roomTypeTitle}>{roomType.roomTypeName}</h2>
                            <div className={styles.bookingRoomsGrid}>
                                {roomType.rooms.map((room) => (
                                    <div
                                        key={room.roomId}
                                        className={`${styles.bookingRoomCard} ${
                                            room.status === "Foglalt" ? styles.disabledRoom : ""
                                        }`}
                                        onClick={() => handleRoomClick(room)}
                                    >
                                        <h3>{formatRoomNumber(room.roomNumber)}</h3>
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
                                ))}
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
