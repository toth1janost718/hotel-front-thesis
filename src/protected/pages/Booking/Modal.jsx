import PropTypes from "prop-types";
import { useState } from "react";
import styles from "./Modal.module.css";

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

    const handleGuestSave = () => {
        if (currentGuestIndex + 1 < selectedGuestCount) {
            setCurrentGuestIndex((prevIndex) => prevIndex + 1);
        } else {
           onSave(guestData.slice(0, selectedGuestCount));
            onClose();
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
                                <strong>Szoba alapára:</strong> {bookingDetails.bookedPrice} Ft/nap
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
                                Vissza
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
                                Vissza
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
        roomNumber: PropTypes.number.isRequired,
    }).isRequired,
    maxGuests: PropTypes.number.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
};

export default Modal;
