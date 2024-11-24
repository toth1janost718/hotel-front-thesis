import React, { useState, useEffect } from "react";
import {
    getAllEmployeeSchedules,
    getEmployeeCurrentMonthSchedule,
    updateShiftInDatabase
} from "../../api/employeeApi.js";
import employeeStyles from "./Employees.module.css";

function Employees() {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);
    const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
    const [filters, setFilters] = useState({
        searchTerm: "",
        scheduleStatus: "",
    });
    const saveShiftChanges = async (index) => {
        const schedule = monthlySchedule[index];
        const updatedShift = {
            shiftDate: schedule.shiftDate,
            shiftStart: schedule.shiftStart,
            shiftEnd: schedule.shiftEnd,
        };

        try {
            // API hívás a frissítéshez
            await updateShiftInDatabase(selectedEmployee.id, updatedShift);

            // Frissített adatok mentése a state-be
            setMonthlySchedule((prevSchedule) => {
                const updatedSchedule = [...prevSchedule];
                updatedSchedule[index] = { ...updatedSchedule[index], isEditing: false };
                return updatedSchedule;
            });

            setEditingIndex(null); // Kilépés szerkesztésből
        } catch (error) {
            console.error("Hiba a műszak mentésekor:", error);
        }
    };




    const [monthlySchedule, setMonthlySchedule] = useState([]);
    const [error, setError] = useState("");
    const getCurrentMonthName = () => {
        const date = new Date();
        return date.toLocaleString('hu-HU', { month: 'long' }); // Hónap neve magyarul
    };

    const [editingIndex, setEditingIndex] = useState(null);
    const enableEditing = (index) => {
        setEditingIndex(index);
    };

    const handleEditChange = (index, field, value) => {
        setMonthlySchedule((prevSchedule) => {
            const updatedSchedule = [...prevSchedule];
            updatedSchedule[index][field] = value;
            return updatedSchedule;
        });
    };



    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const data = await getAllEmployeeSchedules();


                const mappedEmployees = data.map(employee => ({
                    ...employee,
                    id: employee.id
                }));

                setEmployees(mappedEmployees);
                // eslint-disable-next-line no-unused-vars
            } catch (error) {
                setError("Nem sikerült lekérni az alkalmazottak adatait.");
            }
        };


        fetchEmployees();
    }, []);



    const openEmployeeModal = async (employee) => {


        if (!employee || !employee.id) {

            return;
        }

        setSelectedEmployee(employee);
        setIsEmployeeModalOpen(true);

        try {
            const schedule = await getEmployeeCurrentMonthSchedule(employee.id);

            setMonthlySchedule(schedule);
        } catch (error) {

            setMonthlySchedule([]);
        }
    };


    const closeEmployeeModal = () => {
        setSelectedEmployee(null);
        setIsEmployeeModalOpen(false);
        setEditingIndex(null);
        setMonthlySchedule((prevSchedule) =>
            prevSchedule.map((schedule) => ({ ...schedule, isEditing: false }))
        );
    };

    const openScheduleModal = () => {
        setIsScheduleModalOpen(true);
    };

    const closeScheduleModal = () => {
        setIsScheduleModalOpen(false);
    };

    const filteredEmployees = employees.filter((employee) => {
        const matchesSearchTerm =
            employee.lastName.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
            employee.firstName.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
            employee.positionName.toLowerCase().includes(filters.searchTerm.toLowerCase());
        const matchesScheduleStatus =
            filters.scheduleStatus === "" || employee.scheduleStatus === parseInt(filters.scheduleStatus);

        return matchesSearchTerm && matchesScheduleStatus;
    });

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    return (
        <div className={`${employeeStyles.customBody} ${employeeStyles.employeesPageContent}`}>
            <div className={employeeStyles.employeesContainer}>
                <div className={employeeStyles.headerContainer}>
                    <div className={employeeStyles.titleAndFilter}>
                        <h1 className={employeeStyles.employeesTitle}>Alkalmazottak</h1>
                        <input
                            type="text"
                            name="searchTerm"
                            placeholder="Keresés (név, pozíció)"
                            value={filters.searchTerm}
                            onChange={handleFilterChange}
                            className={employeeStyles.generalFilterInput}
                        />
                    </div>
                    <button
                        className={employeeStyles.addButton}
                        onClick={openScheduleModal}
                    >
                        Módosítás
                    </button>
                </div>
                {error && <p className={employeeStyles.employeesError}>{error}</p>}
                <table className={employeeStyles.employeesTable}>
                    <thead>
                    <tr>
                        <th>Vezetéknév</th>
                        <th>Keresztnév</th>
                        <th>Pozíció</th>
                        <th>
                            <select
                                name="scheduleStatus"
                                value={filters.scheduleStatus}
                                onChange={handleFilterChange}
                                className={employeeStyles.filterSelect}
                            >
                                <option value="">Összes</option>
                                <option value="1">Munkában</option>
                                <option value="2">Szabadnap</option>
                                <option value="3">Szabadság</option>
                            </select>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredEmployees.map((employee) => (
                        <tr key={employee.id}>
                            <td>{employee.lastName}</td>
                            <td>{employee.firstName}</td>
                            <td>{employee.positionName}</td>
                            <td>
                                <button
                                    className={`${employeeStyles.employeesStatusButton} ${
                                        employee.scheduleStatus === 1
                                            ? employeeStyles.employeesWorking
                                            : employee.scheduleStatus === 2
                                                ? employeeStyles.employeesDayOff
                                                : employeeStyles.employeesOnLeave
                                    }`}
                                    onClick={() => openEmployeeModal(employee)} // employee objektum átadása
                                >
                                    {employee.scheduleStatus === 1 && "Munkában"}
                                    {employee.scheduleStatus === 2 && "Szabadnap"}
                                    {employee.scheduleStatus === 3 && "Szabadság"}
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                {isEmployeeModalOpen && selectedEmployee && (
                    <div className={employeeStyles.modalOverlay}>
                        <div className={employeeStyles.modal}>
                            <h3>{selectedEmployee.lastName} {selectedEmployee.firstName}</h3>

                            <p>Pozíció: {selectedEmployee.positionName}</p>
                            <p>Munkanapok ({getCurrentMonthName()} hónapban)</p>
                            <table className={employeeStyles.scheduleTable}>
                                <thead>
                                <tr>
                                    <th>Dátum</th>
                                    <th>Státusz</th>
                                    <th>Kezdés</th>
                                    <th>Befejezés</th>
                                </tr>
                                </thead>
                                <tbody>
                                {monthlySchedule.map((schedule, index) => (
                                    <tr key={index}>
                                        <td>{schedule.shiftDate}</td>
                                        <td>
                                            {schedule.isLeave
                                                ? "Szabadság"
                                                : schedule.shiftStart && schedule.shiftEnd
                                                    ? "Munkában"
                                                    : "Szabadnap"}
                                        </td>
                                        <td>
                                            {editingIndex === index ? (
                                                <input
                                                    type="time"
                                                    value={schedule.shiftStart || ""}
                                                    onChange={(e) =>
                                                        handleEditChange(index, "shiftStart", e.target.value)
                                                    }
                                                    className={employeeStyles.timeInput}
                                                />
                                            ) : (
                                                schedule.shiftStart || "-"
                                            )}
                                        </td>
                                        <td>
                                            {editingIndex === index ? (
                                                <input
                                                    type="time"
                                                    value={schedule.shiftEnd || ""}
                                                    onChange={(e) =>
                                                        handleEditChange(index, "shiftEnd", e.target.value)
                                                    }
                                                    className={employeeStyles.timeInput}
                                                />
                                            ) : (
                                                schedule.shiftEnd || "-"
                                            )}
                                        </td>
                                        <td>
                                            {editingIndex === index ? (
                                                <button
                                                    onClick={() => saveShiftChanges(index)}
                                                    className={employeeStyles.saveButton}
                                                >
                                                    ✔️
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => enableEditing(index)}
                                                    className={employeeStyles.editButton}
                                                >
                                                    ✏️
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>


                            </table>
                            <button onClick={closeEmployeeModal} className={employeeStyles.closeModalButton}>
                                Bezárás
                            </button>
                        </div>
                    </div>
                )}

                {isScheduleModalOpen && (
                    <div className={employeeStyles.modalOverlay}>
                        <div className={employeeStyles.modal}>
                            <h3>Módosítás</h3>
                            <p>Itt lehet a beosztást rögzíteni.</p>
                            <button onClick={closeScheduleModal} className={employeeStyles.closeModalButton}>
                                Bezárás
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Employees;
