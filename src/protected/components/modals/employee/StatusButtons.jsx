import React from "react";
import styles from "../../../pages/Employees/Employees.module.css";
import vacationImg from "../../../../protected/assets/employeImgs/work.png";
import dayoffImg from "../../../../protected/assets/employeImgs/work.png";
import workImg from "../../../../protected/assets/employeImgs/work.png";

const StatusButtons = ({onStatusClick}) => {
    return (
        <div className={styles.statusIcons}>
            <div className={styles.iconWrapper}>
                <button
                    onClick={() => onStatusClick("Szabadság")}
                    className={styles.iconButton}
                    style={{backgroundImage: `url(${vacationImg})`}}
                    aria-label="Szabadság"
                />
                <span className={styles.iconLabel}>Szabadság</span>
            </div>
            <div className={styles.iconWrapper}>
                <button
                    onClick={() => onStatusClick("Szabadnap")}
                    className={styles.iconButton}
                    style={{backgroundImage: `url(${dayoffImg})`}}
                    aria-label="Szabadnap"
                />
                <span className={styles.iconLabel}>Szabadnap</span>
            </div>
            <div className={styles.iconWrapper}>
                <button
                    onClick={() => onStatusClick("Munkában")}
                    className={styles.iconButton}
                    style={{backgroundImage: `url(${workImg})`}}
                    aria-label="Munkában"
                />
                <span className={styles.iconLabel}>Munkában</span>
            </div>
        </div>
    );
};

export default StatusButtons;
