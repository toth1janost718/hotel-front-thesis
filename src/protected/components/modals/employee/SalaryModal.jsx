import React from "react";
import styles from "../../../pages/Employees/Employees.module.css";


const SalaryModal = ({onClose}) => {
    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <h2>Bér információ</h2>
                <p>Itt található a bérrel kapcsolatos információ.</p>
                <button onClick={onClose}>Bezárás</button>
            </div>
        </div>
    );
};

export default SalaryModal;
