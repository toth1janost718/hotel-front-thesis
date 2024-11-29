import PropTypes from "prop-types"; // Importáld a PropTypes-t
import styles from "./Modal.module.css";


const Modal = ({ room,  onClose, onSave }) => {

    const handleSave = () => {
        onSave();
        onClose();
    };

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <h2>Vendégek felvétele</h2>
                <p>Szobaszám: {room?.roomNumber}</p>

                <div className={styles.modalButtons}>
                    <button className={styles.saveButton} onClick={handleSave}>
                        Mentés
                    </button>
                    <button className={styles.cancelButton} onClick={onClose}>
                        Vissza
                    </button>
                </div>
            </div>
        </div>
    );
};

// PropTypes használata
Modal.propTypes = {
    room: PropTypes.shape({
        roomNumber: PropTypes.number.isRequired,
        status: PropTypes.string.isRequired,
    }).isRequired,
    maxGuests: PropTypes.number.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
};

export default Modal;
