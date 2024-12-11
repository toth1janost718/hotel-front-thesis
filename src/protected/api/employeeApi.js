import config from "../../../config.js";
import {toast} from "react-toastify";

/**
 * Ez a modul az alkalmazottakkal kapcsolatos API-hívásokat kezeli, beleértve:
 * - Az összes alkalmazott beosztásának lekérése.
 * - Egy adott alkalmazott aktuális havi beosztásának lekérése.
 * - Az alkalmazotti műszakadatok frissítése az adatbázisban.
 *
 * Az API-hívások az `hrApiBaseUrl` alapján működnek, amelyet a `config.js` tartalmaz.
 *
 * Függvények:
 * - `getAllEmployeeSchedules`: Az összes alkalmazott beosztásának lekérése.
 * - `getEmployeeCurrentMonthSchedule`: Egy alkalmazott havi beosztásának lekérése.
 * - `updateShiftInDatabase`: Egy alkalmazott műszakadatainak frissítése.
 * - `fetchEmployeesData`:  Alkalmazottak lekérdezése és státuszok hozzárendelése
 */

export const getAllEmployeeSchedules = async () => {
    try {
        const response = await fetch(`${config.hrApiBaseUrl}/api/Employee/schedules`);
        if (!response.ok) {
            throw new Error("Nem sikerült lekérni az alkalmazottak adatait.");
        }
        return await response.json();
    } catch (error) {
        console.error("Hiba az alkalmazottak adatainak lekérésekor:", error);
        toast.error("Hiba történt az adatok lekérésekor. Kérjük, próbálja újra!");
        throw error;
    }
};

export const fetchEmployeesData = async () => {
    try {
        const data = await getAllEmployeeSchedules();

        // Státusz hozzárendelése
        return data.map((employee) => {
            let scheduleStatus = "Munkában";
            if (employee.isLeave) {
                scheduleStatus = "Szabadság";
            } else if (!employee.shiftStart && !employee.shiftEnd) {
                scheduleStatus = "Szabadnap";
            }
            return { ...employee, scheduleStatus };
        });
    } catch (error) {
        console.error("Hiba az alkalmazottak adatainak lekérésekor:", error);
        toast.error("Hiba történt az alkalmazottak adatainak lekérésekor. Kérjük, próbálja újra!");
        throw error; // Hibát továbbítjuk, hogy a komponensben kezelhető legyen
    }
};

export const getEmployeeCurrentMonthSchedule = async (employeeId) => {


    try {
        const response = await fetch(`${config.hrApiBaseUrl}/api/Employee/${employeeId}/schedule`);
        if (!response.ok) {
            throw new Error("Nem sikerült lekérni az alkalmazott havi beosztását.");
        }
        return await response.json();
    } catch (error) {
        console.error("Hiba az alkalmazott havi beosztásának lekérésekor:", error);
        toast.error("Hiba történt az adatok lekérésekor. Kérjük, próbálja újra!");
        throw error;
    }
};

export const updateShiftInDatabase = async (employeeId, updatedShift) => {
    try {

        const response = await fetch(`${config.hrApiBaseUrl}/api/Employee/${employeeId}/schedule`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                employeeId: employeeId,
                shiftDate: updatedShift.shiftDate,
                shiftStart: updatedShift.shiftStart,
                shiftEnd: updatedShift.shiftEnd,
                isLeave: updatedShift.isLeave || false,
                deleteLeaveIfOverlap: true,
            }),
        });

        if (!response.ok) {
            throw new Error("Nem sikerült frissíteni a műszak adatait.");
        }
    } catch (error) {
        console.error("Hiba a műszak frissítésekor:", error);
        toast.error("Hiba a műszak frissítésekor. Kérjük, próbálja újra!");
        throw error;
    }
};

