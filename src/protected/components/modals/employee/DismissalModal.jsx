import React from "react";
import styles from "../../../pages/Employees/Employees.module.css";

const DismissalModal = ({onClose}) => {
    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <h2>Elbocsátás információ</h2>
                <p>Itt található az elbocsátással kapcsolatos információ.</p>
                <button onClick={onClose}>Bezárás</button>
            </div>
        </div>
    );
};

export default DismissalModal;