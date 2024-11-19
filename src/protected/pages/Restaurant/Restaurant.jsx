import React, { useState, useEffect } from 'react';
import restaurantStyles from './Restaurant.module.css';
import config from '../../../../config.js';
import TableIcon from '../../assets/restaurantImgs/dining-table.png';

function Restaurant() {
    const [rooms, setRooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // Szobák adatainak lekérése
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


    const handleRoomClick = (roomId) => {
        setSelectedRoom(roomId);
        setShowModal(true);
    };

    // Modál bezárása
    const closeModal = () => {
        setSelectedRoom(null);
        setShowModal(false);
    };

    return (
        <div className={restaurantStyles['restaurant-content']}>
            <div className={restaurantStyles['restaurant-container']}>
                <h2 className={restaurantStyles['restaurant-title']}>Éttermi fogyasztás rögzítése</h2>

                <div className={restaurantStyles['restaurant-iconGrid']}>
                    {rooms.map((room) => (
                        <div
                            key={room.roomId}
                            className={restaurantStyles['restaurant-roomIcon']}
                            onClick={() => handleRoomClick(room.roomId)}
                        >
                            <img
                                src={TableIcon}
                                alt="Dining Table Icon"
                                className={restaurantStyles['restaurant-icon']}
                            />
                            <span className={restaurantStyles['restaurant-roomNumber']}>
                                {room.roomNumber}
                            </span>
                        </div>
                    ))}
                </div>

                {showModal && (
                    <div className={restaurantStyles['modal-overlay']} onClick={closeModal}>
                        <div
                            className={restaurantStyles['modal']}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h3>Rendelés felvitel</h3>
                            <p>Szobaszám: {selectedRoom}</p>
                            <form>
                                <label>
                                    Étel/Ital:
                                    <select name="foodOrDrink" required>
                                        <option value="" disabled selected>Válassz egy lehetőséget</option>
                                        <option value="1">Pizza</option>
                                        <option value="2">Kóla</option>
                                    </select>
                                </label>
                                <label>
                                    Mennyiség:
                                    <input type="number" name="quantity" min="1" max="99" required/>
                                </label>
                                <p>
                                    <strong>Végösszeg:</strong> 0 Ft
                                </p>
                                <div className="button-group">
                                    <button type="submit">Mentés</button>
                                    <button type="button" onClick={closeModal}>Mégse</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Restaurant;
