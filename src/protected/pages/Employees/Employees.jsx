import React, { useState, useEffect } from "react";
import { getEmployeeSchedules } from "../../api/employeeApi.js";
import employeeStyles from "./Employees.module.css";

function Employees() {
    const [employees, setEmployees] = useState([]);
    const [filters, setFilters] = useState({
        lastName: "",
        firstName: "",
        positionName: "",
        scheduleStatus: "",
    });
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const data = await getEmployeeSchedules();
                setEmployees(data);
            } catch (error) {
                setError("Nem sikerült lekérni az alkalmazottak adatait.");
            }
        };

        fetchEmployees();
    }, []);

    // Szűrt adatok
    const filteredEmployees = employees.filter((employee) => {
        const matchesLastName = employee.lastName
            .toLowerCase()
            .includes(filters.lastName.toLowerCase());
        const matchesFirstName = employee.firstName
            .toLowerCase()
            .includes(filters.firstName.toLowerCase());
        const matchesPositionName = employee.positionName
            .toLowerCase()
            .includes(filters.positionName.toLowerCase());
        const matchesScheduleStatus =
            filters.scheduleStatus === "" || employee.scheduleStatus === filters.scheduleStatus;

        return matchesLastName && matchesFirstName && matchesPositionName && matchesScheduleStatus;
    });

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    return (
        <div className={employeeStyles.employeesPageContent}>
            <div className={employeeStyles.employeesContainer}>
                <h1 className={employeeStyles.employeesTitle}>Alkalmazottak</h1>
                {error && <p className={employeeStyles.employeesError}>{error}</p>}
                <table className={employeeStyles.employeesTable}>
                    <thead>
                    <tr>
                        <th>
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Szűrés vezetéknévre"
                                value={filters.lastName}
                                onChange={handleFilterChange}
                                className={employeeStyles.filterInput}
                            />
                        </th>
                        <th>
                            <input
                                type="text"
                                name="firstName"
                                placeholder="Szűrés keresztnévre"
                                value={filters.firstName}
                                onChange={handleFilterChange}
                                className={employeeStyles.filterInput}
                            />
                        </th>
                        <th>
                            <input
                                type="text"
                                name="positionName"
                                placeholder="Szűrés pozícióra"
                                value={filters.positionName}
                                onChange={handleFilterChange}
                                className={employeeStyles.filterInput}
                            />
                        </th>
                        <th>
                            <select
                                name="scheduleStatus"
                                value={filters.scheduleStatus}
                                onChange={handleFilterChange}
                                className={employeeStyles.filterSelect}
                            >
                                <option value="">Összes</option>
                                <option value="Working">Munkában</option>
                                <option value="DayOff">Szabadnap</option>
                                <option value="OnLeave">Szabadságon</option>
                            </select>
                        </th>
                    </tr>
                    <tr>
                        <th>Vezetéknév</th>
                        <th>Keresztnév</th>
                        <th>Pozíció</th>
                        <th>Státusz</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredEmployees.map((employee) => (
                        <tr key={`${employee.firstName}-${employee.lastName}`}>
                            <td>{employee.lastName}</td>
                            <td>{employee.firstName}</td>
                            <td>{employee.positionName}</td>
                            <td>
                                <button
                                    className={`${employeeStyles.employeesStatusButton} ${
                                        employee.scheduleStatus === "Working"
                                            ? employeeStyles.employeesWorking
                                            : employee.scheduleStatus === "DayOff"
                                                ? employeeStyles.employeesDayOff
                                                : employeeStyles.employeesOnLeave
                                    }`}
                                >
                                    {employee.scheduleStatus === "Working" && "Munkában"}
                                    {employee.scheduleStatus === "DayOff" && "Szabadnap"}
                                    {employee.scheduleStatus === "OnLeave" && "Szabadságon"}
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Employees;
