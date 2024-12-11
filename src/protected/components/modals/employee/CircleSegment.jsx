import React from "react";
import styles from "../../../pages/Employees/Employees.module.css";

const CircleSegment = ({ segmentClass, label, onClick }) => {
    return (
        <div className={`${styles.circleSegment} ${segmentClass}`} onClick={onClick}>
            <div className={styles.textWrapper}>
                <span>{label}</span>
            </div>
        </div>
    );
};

export default CircleSegment;
