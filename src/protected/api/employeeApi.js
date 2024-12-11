import { fetchApiData } from "./apiHelpers.js"; // Az általános API-függvény importálása
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
        return await fetchApiData("/api/Employee/schedules");
    } catch (error) {
        toast.error("Nem sikerült lekérni az alkalmazottak adatait.");
        throw error;
    }
};

export const fetchEmployeesData = async () => {
    try {
        const data = await getAllEmployeeSchedules();
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
        toast.error("Hiba történt az alkalmazottak adatainak lekérésekor.");
        throw error;
    }
};


export const getEmployeeCurrentMonthSchedule = async (employeeId) => {
    try {
        return await fetchApiData(`/api/Employee/${employeeId}/schedule`);
    } catch (error) {
        toast.error("Nem sikerült lekérni az alkalmazott havi beosztását.");
        throw error;
    }
};


export const updateShiftInDatabase = async (employeeId, updatedShift) => {
    try {
        await fetchApiData(`/api/Employee/${employeeId}/schedule`, {
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
    } catch (error) {
        toast.error("Nem sikerült frissíteni a műszak adatait.");
        throw error;
    }
};
