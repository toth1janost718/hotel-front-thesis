import React, { useState } from "react";
import employeeStyles from "./Employees.module.css";
import vacationImg from "../../../protected/assets/employeImgs/vacation.png";
import dayoffImg from "../../../protected/assets/employeImgs/dayoff.png";
import workImg from "../../../protected/assets/employeImgs/work.png";

function Employees() {
    const [isStatusOpen, setIsStatusOpen] = useState(false); // Állapot lenyitás kezelése
    const [activeModal, setActiveModal] = useState(null); // Aktív modál kezelése

    const toggleStatusMenu = () => {
        setIsStatusOpen((prev) => !prev); // Állapot gomb lenyitás/zárás
    };

    const handleStatusClick = (status) => {
        console.log(`${status} kiválasztva`); // Debug: státusz kattintás
    };

    const openModal = (modalId) => {
        setActiveModal(modalId); // Megnyitja az adott modált
    };

    const closeModal = () => {
        setActiveModal(null); // Bezárja a modált
    };

    return (
        <div className={employeeStyles.pageContainer}>
            {/* Bal oldali oszlop */}
            <div className={employeeStyles.leftColumn}>
                <input
                    type="text"
                    placeholder="Keresés (név, pozíció)"
                    className={employeeStyles.searchInput}
                />

                {/* Állapot gomb */}
                <button
                    className={employeeStyles.statusButton}
                    onClick={toggleStatusMenu}
                >
                    Állapot
                </button>

                {/* Állapot lenyíló menü */}
                {isStatusOpen && (
                    <div className={employeeStyles.statusIcons}>
                        <div className={employeeStyles.iconWrapper}>
                            <button
                                onClick={() => handleStatusClick("Szabadság")}
                                className={employeeStyles.iconButton}
                                style={{ backgroundImage: `url(${vacationImg})` }}
                                aria-label="Szabadság"
                            />
                            <span className={employeeStyles.iconLabel}>Szabadság</span>
                        </div>
                        <div className={employeeStyles.iconWrapper}>
                            <button
                                onClick={() => handleStatusClick("Szabadnap")}
                                className={employeeStyles.iconButton}
                                style={{ backgroundImage: `url(${dayoffImg})` }}
                                aria-label="Szabadnap"
                            />
                            <span className={employeeStyles.iconLabel}>Szabadnap</span>
                        </div>
                        <div className={employeeStyles.iconWrapper}>
                            <button
                                onClick={() => handleStatusClick("Munka")}
                                className={employeeStyles.iconButton}
                                style={{ backgroundImage: `url(${workImg})` }}
                                aria-label="Munka"
                            />
                            <span className={employeeStyles.iconLabel}>Munka</span>
                        </div>
                    </div>
                )}

                {/* Kör és szegmensek */}
                <div className={employeeStyles.circleContainer}>
                    <div
                        className={`${employeeStyles.circleSegment} ${employeeStyles.segment1}`}
                        onClick={() => openModal("ber")}
                    >
                        <div className={employeeStyles.textWrapper}>
                            <span>Bér</span>
                        </div>
                    </div>
                    <div
                        className={`${employeeStyles.circleSegment} ${employeeStyles.segment2}`}
                        onClick={() => openModal("beosztas")}
                    >
                        <div className={employeeStyles.textWrapper}>
                            <span>Beosztás</span>
                        </div>
                    </div>
                    <div
                        className={`${employeeStyles.circleSegment} ${employeeStyles.segment3}`}
                        onClick={() => openModal("elbocsatas")}
                    >
                        <div className={employeeStyles.textWrapper}>
                            <span>Elbocsátás</span>
                        </div>
                    </div>
                    <div
                        className={`${employeeStyles.circleSegment} ${employeeStyles.segment4}`}
                        onClick={() => openModal("egyeb")}
                    >
                        <div className={employeeStyles.textWrapper}>
                            <span>Egyéb</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Jobb oldali oszlop */}
            <div className={employeeStyles.rightColumn}>
                <h2>Dolgozói lista</h2>
                <div className={employeeStyles.employeeList}>

                </div>
            </div>

            {/* Modálok */}
            {activeModal === "ber" && (
                <div className={employeeStyles.modalOverlay} onClick={closeModal}>
                    <div className={employeeStyles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <h2>Bér információ</h2>
                        <p>Itt található a bérrel kapcsolatos információ.</p>
                        <button onClick={closeModal}>Bezárás</button>
                    </div>
                </div>
            )}
            {activeModal === "beosztas" && (
                <div className={employeeStyles.modalOverlay} onClick={closeModal}>
                    <div className={employeeStyles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <h2>Beosztás információ</h2>
                        <p>Itt található a beosztással kapcsolatos információ.</p>
                        <button onClick={closeModal}>Bezárás</button>
                    </div>
                </div>
            )}
            {activeModal === "elbocsatas" && (
                <div className={employeeStyles.modalOverlay} onClick={closeModal}>
                    <div className={employeeStyles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <h2>Elbocsátás információ</h2>
                        <p>Itt található az elbocsátással kapcsolatos információ.</p>
                        <button onClick={closeModal}>Bezárás</button>
                    </div>
                </div>
            )}
            {activeModal === "egyeb" && (
                <div className={employeeStyles.modalOverlay} onClick={closeModal}>
                    <div className={employeeStyles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <h2>Egyéb információ</h2>
                        <p>Itt található az egyéb információ.</p>
                        <button onClick={closeModal}>Bezárás</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Employees;
