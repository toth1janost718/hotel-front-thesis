import  { useEffect, useState } from "react";
import { fetchRoomTypesWithRooms } from "../../api/bookingApi";
import styles from "./Booking.module.css";
import Modal from "./Modal";

// Ikonok importálása
import availableIcon from "../../../protected/assets/bookImgs/available.png";
import occupiedIcon from "../../../protected/assets/bookImgs/occupied.png";
import outOfOrderIcon from "../../../protected/assets/bookImgs/outoforder.png";

// Config importálása az API URL-hez
import config from "../../../../config.js";

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
    const [selectedRoom, setSelectedRoom] = useState(null);

    useEffect(() => {
        const getRoomTypesWithRooms = async () => {
            try {
                const formattedDate = date.toISOString().split("T")[0];
                const data = await fetchRoomTypesWithRooms(formattedDate);
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

    const formatRoomNumber = (roomNumber) => roomNumber.toString().padStart(3, "0");

    const handleRoomClick = (room) => {
        if (room.status === "Szabad") {
            setSelectedRoom(room);
        }
    };

    const handleModalClose = () => {
        setSelectedRoom(null);
    };

    const handleSave = () => {
        console.log("Mentés történt a következő szobához:", selectedRoom);
        setSelectedRoom(null);
    };

    const handleRoomIcon = (status) => {
        switch (status) {
            case "Szabad":
                return availableIcon;
            case "Foglalt":
                return occupiedIcon;
            default:
                return outOfOrderIcon;
        }
    };

    return (
        <div className={styles.fullyPageBody}>
            <div className={styles.bookingPageContent}>
                <div className={styles.bookingHeader}>
                    <h1 className={styles.bookingTitle}>Foglalások kezelése</h1>
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

                {/* Szobák két oszlopba rendezése */}
                {roomTypes.length > 0 ? (
                    roomTypes.reduce((rows, _, index, arr) => {
                        if (index % 2 === 0) rows.push(arr.slice(index, index + 2));
                        return rows;
                    }, []).map((pair, rowIndex) => (
                        <div key={rowIndex} className={styles.rowContainer}>
                            {pair.map((roomType) => (
                                <div key={roomType.roomTypeId} className={styles.roomTypeSection}>
                                    <div className={styles.roomTypeHeader}>
                                        <h2 className={styles.roomTypeTitle}>{roomType.roomTypeName}</h2>
                                        <img
                                            src={`${config.bookingApiBaseUrl}${roomType.pictUrl}`}
                                            alt={`${roomType.roomTypeName} kép`}
                                            className={styles.roomTypeImage}
                                        />
                                    </div>
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
                                                <img
                                                    src={handleRoomIcon(room.status)}
                                                    alt={room.status}
                                                    className={styles.roomStatusIcon}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))
                ) : (
                    <p>Nincsenek elérhető szobák!</p>
                )}

                {/* Modális ablak */}
                {selectedRoom && (
                    <Modal
                        room={selectedRoom}
                        onClose={handleModalClose}
                        onSave={handleSave}
                    />
                )}
            </div>
        </div>
    );
};


export default Booking;
