import React from "react";
import styles from "../../../pages/Employees/Employees.module.css";

const ScheduleModal = ({onClose}) => {
    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <h2>Beosztás információ</h2>
                <p>Itt található a beosztással kapcsolatos információ.</p>
                <button onClick={onClose}>Bezárás</button>
            </div>
        </div>
    );
};

export default ScheduleModal;