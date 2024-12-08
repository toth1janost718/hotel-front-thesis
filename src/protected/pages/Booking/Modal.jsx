import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import styles from "./Modal.module.css";
import {fetchRoomPriceByType, saveBookingToApi} from "../../api/bookingApi";

const Modal = ({ room, maxGuests, onClose, onSave }) => {
    const [step, setStep] = useState(1); // 1: Foglalás, 2: Vendégszám választás, 3: Vendégek
    const [bookingDetails, setBookingDetails] = useState({
        checkInDate: "",
        checkOutDate: "",
        contactEmail: "",
        contactPhone: "",
        mealPlanId: 0,
        bookedPrice: 0,
        additionalCharges: 0,
    });
    const [errors, setErrors] = useState({});
    const [selectedGuestCount, setSelectedGuestCount] = useState(1); // Kiválasztott vendégszám
    const [currentGuestIndex, setCurrentGuestIndex] = useState(0); // Éppen aktuális vendég indexe
    const [guestData, setGuestData] = useState(
        Array.from({ length: maxGuests }, () => ({
            lastName: "",
            firstName: "",
            age: "",
            city: "",
            postalCode: "",
            type: "Felnőtt",
        }))
    );
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchRoomPrice = async () => {
            setLoading(true);
            try {
                const priceData = await fetchRoomPriceByType(room.roomTypeId);
                setBookingDetails((prevDetails) => ({
                    ...prevDetails,
                    bookedPrice: priceData.adultPricePerNight, // Alapértelmezett ár felnőtteknek
                }));
            } catch (error) {
                console.error("Hiba történt a szoba árának betöltésekor:", error.message);
                alert("Nem sikerült betölteni a szoba árait.");
            } finally {
                setLoading(false);
            }
        };

        if (room?.roomTypeId) {
            fetchRoomPrice();
        }
    }, [room?.roomTypeId]);




    const validateBookingDetails = () => {
        const newErrors = {};
        if (!bookingDetails.checkInDate) newErrors.checkInDate = "Érkezés dátuma kötelező!";
        if (!bookingDetails.checkOutDate) newErrors.checkOutDate = "Távozás dátuma kötelező!";
        if (!bookingDetails.contactEmail) newErrors.contactEmail = "Kapcsolattartó email kötelező!";
        if (!bookingDetails.contactPhone) newErrors.contactPhone = "Kapcsolattartó telefon kötelező!";
        return newErrors;
    };

    const handleBookingSave = () => {
        const newErrors = validateBookingDetails();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        setStep(2);
    };

    const handleGuestCountSelect = (guestCount) => {
        setSelectedGuestCount(guestCount);
        setCurrentGuestIndex(0);
        setStep(3);
    };

    const handleInputChange = (field, value) => {
        const updatedGuestData = [...guestData];
        updatedGuestData[currentGuestIndex][field] = value;
        setGuestData(updatedGuestData);
    };

    const fetchRoomPrice = async (roomTypeId) => {
        try {
            const response = await fetch(`/api/RoomPriceFilter/${roomTypeId}`);
            if (!response.ok) {
                throw new Error("Hiba történt a szoba árának betöltésekor.");
            }
            const priceData = await response.json();
            return priceData.adultPricePerNight; // Csak a felnőtt ár érdekel
        } catch (error) {
            console.error("Hiba történt a szoba árának betöltésekor:", error.message);
            return 0; // Alapértelmezett érték hiba esetén
        }
    };


    const handleGuestSave = async () => {
        if (currentGuestIndex + 1 < selectedGuestCount) {
            setCurrentGuestIndex((prevIndex) => prevIndex + 1);
        } else {
            const formattedGuests = guestData.slice(0, selectedGuestCount).map(guest => ({
                ...guest,
                age: parseInt(guest.age, 10),
                postalCode: parseInt(guest.postalCode, 10),
                isAdult: guest.type === "Felnőtt",
            }));

            // Vendégek kategorizálása
            const adults = formattedGuests.filter(guest => guest.isAdult).length;
            const children = formattedGuests.filter(guest => !guest.isAdult && guest.age >= 3).length;
            const under3 = formattedGuests.filter(guest => guest.age < 3).length;

            // Foglalás időtartama
            const checkInDate = new Date(bookingDetails.checkInDate);
            const checkOutDate = new Date(bookingDetails.checkOutDate);
            const days = Math.max(
                (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24),
                1
            );

            try {
                // Szobaárak lekérése
                const roomPrices = await fetchRoomPriceByType(room.roomTypeId);
                const adultPrice = roomPrices.adultPricePerNight;
                const childPrice = roomPrices.childPricePerNight;
                const under3Price = roomPrices.under3Price;

                // Végső ár kiszámítása
                const totalPrice =
                    days * (adults * adultPrice + children * childPrice + under3 * under3Price);

                // Árak frissítése
                setBookingDetails((prevDetails) => ({
                    ...prevDetails,
                    bookedPrice: totalPrice,
                }));

                // Foglalás adatainak összeállítása
                const bookingData = {
                    ...bookingDetails,
                    bookedPrice: totalPrice, // Végső ár
                    roomId: room.roomId,
                    bookingStatus: "Foglalt",
                    room: {
                        roomId: room.roomId,
                        roomNumber: room.roomNumber,
                        roomTypeId: room.roomTypeId || 1,
                    },
                    mealPlan: {
                        mealPlanId: bookingDetails.mealPlanId,
                        mealOption: "Félpanzió",
                        mealPrice: 6000,
                    },
                    guests: formattedGuests,
                };

                console.log("Elküldött JSON:", JSON.stringify(bookingData, null, 2));

                // API hívás
                const result = await saveBookingToApi(bookingData);
                console.log("Foglalás sikeresen mentve:", result);
                alert("Foglalás sikeresen mentve!");
                onClose();
            } catch (error) {
                console.error("Hiba történt a foglalás árának kiszámítása során:", error.message);
                alert("Nem sikerült kiszámolni a foglalás árát.");
            }
        }
    };





    return (
        <div className={styles.modalContainer}>
            <div className={styles.modalContentWrapper}>
                {step === 1 && (
                    <>
                        <h2>Foglalás adatai</h2>
                        <div className={styles.bookingDetails}>
                            <label>
                                Érkezés dátuma:
                                <input
                                    type="date"
                                    value={bookingDetails.checkInDate}
                                    onChange={(e) =>
                                        setBookingDetails({ ...bookingDetails, checkInDate: e.target.value })
                                    }
                                    className={errors.checkInDate ? styles.inputError : ""}
                                />
                                {errors.checkInDate && <p className={styles.errorText}>{errors.checkInDate}</p>}
                            </label>
                            <label>
                                Távozás dátuma:
                                <input
                                    type="date"
                                    value={bookingDetails.checkOutDate}
                                    onChange={(e) =>
                                        setBookingDetails({ ...bookingDetails, checkOutDate: e.target.value })
                                    }
                                    className={errors.checkOutDate ? styles.inputError : ""}
                                />
                                {errors.checkOutDate && <p className={styles.errorText}>{errors.checkOutDate}</p>}
                            </label>
                            <label>
                                Kapcsolattartó email:
                                <input
                                    type="email"
                                    value={bookingDetails.contactEmail}
                                    onChange={(e) =>
                                        setBookingDetails({ ...bookingDetails, contactEmail: e.target.value })
                                    }
                                    className={errors.contactEmail ? styles.inputError : ""}
                                />
                                {errors.contactEmail && <p className={styles.errorText}>{errors.contactEmail}</p>}
                            </label>
                            <label>
                                Kapcsolattartó telefon:
                                <input
                                    type="tel"
                                    value={bookingDetails.contactPhone}
                                    onChange={(e) =>
                                        setBookingDetails({ ...bookingDetails, contactPhone: e.target.value })
                                    }
                                    className={errors.contactPhone ? styles.inputError : ""}
                                />
                                {errors.contactPhone && <p className={styles.errorText}>{errors.contactPhone}</p>}
                            </label>
                            <label>
                                Étkezési terv:
                                <select
                                    value={bookingDetails.mealPlanId}
                                    onChange={(e) =>
                                        setBookingDetails({ ...bookingDetails, mealPlanId: parseInt(e.target.value) })
                                    }
                                >
                                    <option value={0}>Nem kérek</option>
                                    <option value={1}>Reggeli</option>
                                    <option value={2}>Félpanzió</option>
                                    <option value={3}>Teljes ellátás</option>
                                </select>
                            </label>
                            <p>
                                <strong>Szoba
                                    alapára:</strong> {bookingDetails.bookedPrice > 0 ? `${bookingDetails.bookedPrice} Ft/nap` : "Nincs elérhető ár"}
                            </p>

                            <p>
                                <strong>Extra költségek:</strong> {bookingDetails.additionalCharges} Ft
                            </p>
                        </div>
                        <div className={styles.modalActionButtons}>
                            <button className={styles.saveActionButton} onClick={handleBookingSave}>
                                Tovább
                            </button>
                            <button className={styles.cancelActionButton} onClick={onClose}>
                                Kilépés
                            </button>
                        </div>
                    </>
                )}

                {step === 2 && (
                    <>
                        <h2>Vendégek száma</h2>
                        <p>Szobaszám: {room?.roomNumber}</p>
                        <div className={styles.guestSelector}>
                            {Array.from({ length: maxGuests }, (_, i) => i + 1).map((number) => (
                                <div
                                    key={number}
                                    className={`${styles.guestButton} ${
                                        number === selectedGuestCount ? styles.guestButtonActive : ""
                                    }`}
                                    onClick={() => handleGuestCountSelect(number)}
                                >
                                    {number}
                                </div>
                            ))}
                        </div>
                        <div className={styles.modalActionButtons}>
                            <button className={styles.cancelActionButton} onClick={onClose}>
                                Kilépés
                            </button>
                        </div>
                    </>
                )}

                {step === 3 && (
                    <>
                        <h2>{currentGuestIndex + 1}. vendég adatai</h2>
                        <div className={styles.guestInputs}>
                            <label>Vezetéknév:</label>
                            <input
                                type="text"
                                value={guestData[currentGuestIndex]?.lastName || ""}
                                onChange={(e) => handleInputChange("lastName", e.target.value)}
                            />
                            <label>Keresztnév:</label>
                            <input
                                type="text"
                                value={guestData[currentGuestIndex]?.firstName || ""}
                                onChange={(e) => handleInputChange("firstName", e.target.value)}
                            />
                            <label>Kor:</label>
                            <input
                                type="number"
                                value={guestData[currentGuestIndex]?.age || ""}
                                onChange={(e) => handleInputChange("age", e.target.value)}
                            />
                            <label>Város:</label>
                            <input
                                type="text"
                                value={guestData[currentGuestIndex]?.city || ""}
                                onChange={(e) => handleInputChange("city", e.target.value)}
                            />
                            <label>Irányítószám:</label>
                            <input
                                type="text"
                                value={guestData[currentGuestIndex]?.postalCode || ""}
                                onChange={(e) => handleInputChange("postalCode", e.target.value)}
                            />
                            <label>Felnőtt vagy gyerek:</label>
                            <select
                                value={guestData[currentGuestIndex]?.type || "Felnőtt"}
                                onChange={(e) => handleInputChange("type", e.target.value)}
                            >
                                <option value="Felnőtt">Felnőtt</option>
                                <option value="Gyerek">Gyerek</option>
                            </select>
                        </div>
                        <div className={styles.modalActionButtons}>
                            <button className={styles.saveActionButton} onClick={handleGuestSave}>
                                {currentGuestIndex + 1 < selectedGuestCount ? "Tovább" : "Mentés"}
                            </button>
                            <button className={styles.cancelActionButton} onClick={onClose}>
                                Kilépés
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

Modal.propTypes = {
    room: PropTypes.shape({
        roomId: PropTypes.number.isRequired,
        roomNumber: PropTypes.number.isRequired,
        roomTypeId: PropTypes.number.isRequired,
    }).isRequired,
    maxGuests: PropTypes.number.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
};
export default Modal;
