import  { useEffect, useState } from "react";
import {fetchRoomTypesWithCapacity, fetchRoomTypesWithRooms} from "../../api/bookingApi";
import styles from "./Booking.module.css";
import Modal from "./Modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { hu } from "date-fns/locale";

// Ikonok importálása
import availableIcon from "../../../protected/assets/bookImgs/available.png";
import occupiedIcon from "../../../protected/assets/bookImgs/occupied.png";
import outOfOrderIcon from "../../../protected/assets/bookImgs/outoforder.png";

// Config importálása az API URL-hez
import config from "../../../../config.js";



const Booking = () => {
    const [roomTypes, setRoomTypes] = useState([]);
    const [date, setDate] = useState(new Date());
    const [selectedRoom, setSelectedRoom] = useState(null);


    useEffect(() => {
        const fetchRoomData = async () => {
            try {
                const formattedDate = date.toISOString().split("T")[0];

                // Szobák lekérése
                const roomsData = await fetchRoomTypesWithRooms(formattedDate);


                // Kapacitás adatok lekérése
                const capacityData = await fetchRoomTypesWithCapacity();


                // Kapacitás hozzáadása a szobatípusokhoz
                const updatedRoomTypes = roomsData.map((roomType) => ({
                    ...roomType,
                    capacity: capacityData.find((cap) => cap.roomTypeId === roomType.roomTypeId)?.capacity || 0,
                }));


                setRoomTypes(updatedRoomTypes);
            } catch (error) {
                console.error("Hiba az API hívás során:", error);
            }
        };

        fetchRoomData();
    }, [date]);


    const formatRoomNumber = (roomNumber) => roomNumber.toString().padStart(3, "0");

    const handleRoomClick = (room) => {
        if (room.status === "Szabad") {
            setSelectedRoom(room);
        }
    };

    const handleModalClose = () => {
        setSelectedRoom(null);
    };

    // eslint-disable-next-line no-unused-vars
    const handleSave = (guestCount) => {
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
                    <div className={styles.datePickerContainer}>
                        <DatePicker
                            selected={date}
                            onChange={(selectedDate) => setDate(selectedDate)}
                            dateFormat="yyyy. MMMM dd. EEEE"
                            locale={hu}
                            className={styles.datePickerInput}
                        />
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

                {selectedRoom && (
                    <Modal
                        room={selectedRoom}
                        maxGuests={
                            roomTypes.find((type) => type.roomTypeId === selectedRoom.roomTypeId)?.capacity || 1
                        }
                        onClose={handleModalClose}
                        onSave={(guestCount) => {
                                 handleSave(guestCount);
                        }}
                    />
                )}


            </div>

        </div>
    );
};


export default Booking;
