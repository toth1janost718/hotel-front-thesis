import React, { useState, useEffect } from "react";
import employeeStyles from "./Employees.module.css";
import vacationImg from "../../../protected/assets/employeImgs/vacation.png";
import dayoffImg from "../../../protected/assets/employeImgs/dayoff.png";
import workImg from "../../../protected/assets/employeImgs/work.png";
import { getAllEmployeeSchedules } from "../../api/employeeApi.js";

function Employees() {
    const [isStatusOpen, setIsStatusOpen] = useState(false); // Állapot lenyitás kezelése
    const [activeModal, setActiveModal] = useState(null); // Aktív modál kezelése
    const [employees, setEmployees] = useState([]); // Alkalmazottak adatai
    const [filters, setFilters] = useState({ searchTerm: "", status: "" }); // Keresési és állapot szűrő
    const [error, setError] = useState(""); // Hibakezelés

    useEffect(() => {
        // API-hívás az alkalmazottak lekérdezésére
        const fetchEmployees = async () => {
            try {
                const data = await getAllEmployeeSchedules();

                // Állapot hozzárendelése
                const enrichedEmployees = data.map((employee) => {
                    let scheduleStatus = "Munkában";
                    if (employee.isLeave) {
                        scheduleStatus = "Szabadság";
                    } else if (!employee.shiftStart && !employee.shiftEnd) {
                        scheduleStatus = "Szabadnap";
                    }
                    return { ...employee, scheduleStatus };
                });

                setEmployees(enrichedEmployees);
            } catch (err) {
                setError("Nem sikerült lekérni az alkalmazottak adatait.");
            }
        };

        fetchEmployees();
    }, []);

    const toggleStatusMenu = () => {
        setIsStatusOpen((prev) => !prev); // Állapot gomb lenyitás/zárás
        if (isStatusOpen) {
            setFilters((prevFilters) => ({
                ...prevFilters,
                status: "", // Állapot szűrő visszaállítása
            }));
        }
    };

    const handleStatusClick = (status) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            status: status,
        }));
    };

    const openModal = (modalId) => {
        setActiveModal(modalId); // Modális ablak megnyitása
    };

    const closeModal = () => {
        setActiveModal(null); // Modális ablak bezárása
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    // Szűrés keresés és állapot szerint
    const filteredEmployees = employees.filter((employee) => {
        const matchesSearchTerm =
            employee.lastName.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
            employee.firstName.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
            employee.positionName.toLowerCase().includes(filters.searchTerm.toLowerCase());

        const matchesStatus =
            filters.status === "" || employee.scheduleStatus === filters.status;

        return matchesSearchTerm && matchesStatus;
    });

    return (
        <div className={employeeStyles.pageContainer}>
            {/* Bal oldali oszlop */}
            <div className={employeeStyles.leftColumn}>
                <input
                    type="text"
                    placeholder="Keresés (név, pozíció)"
                    name="searchTerm"
                    value={filters.searchTerm}
                    onChange={handleFilterChange}
                    className={employeeStyles.searchInput}
                />

                {/* Állapot gomb */}
                <button
                    className={employeeStyles.statusButton}
                    onClick={toggleStatusMenu}
                >
                    Állapot
                </button>

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
                                onClick={() => handleStatusClick("Munkában")}
                                className={employeeStyles.iconButton}
                                style={{ backgroundImage: `url(${workImg})` }}
                                aria-label="Munkában"
                            />
                            <span className={employeeStyles.iconLabel}>Munkában</span>
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
                {error && <p className={employeeStyles.error}>{error}</p>}
                <table className={employeeStyles.employeeTable}>
                    <thead>
                    <tr>
                        <th>Vezetéknév</th>
                        <th>Keresztnév</th>
                        <th>Pozíció</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredEmployees.map((employee) => (
                        <tr key={employee.employeeId}>
                            <td>{employee.lastName}</td>
                            <td>{employee.firstName}</td>
                            <td>{employee.positionName}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
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