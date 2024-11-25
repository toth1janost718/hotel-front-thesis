import config from "../../../config.js";

//Összes alkalmazott beosztásának a lekérése
const getAllEmployeeSchedules = async () => {
    try {
        const response = await fetch(`${config.hrApiBaseUrl}/api/Employee/schedules`);
        if (!response.ok) {
            throw new Error("Nem sikerült lekérni az alkalmazottak adatait.");
        }
        return await response.json();
    } catch (error) {
        console.error("Hiba az alkalmazottak adatainak lekérésekor:", error);
        throw error;
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
        throw error;
    }
};

export const updateShiftInDatabase = async (employeeId, updatedShift) => {
    try {
        console.log("Küldött employeeId:", employeeId);
        console.log("Küldött updatedShift:", updatedShift);

        const response = await fetch(`${config.hrApiBaseUrl}/api/Employee/${employeeId}/schedule`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                employeeId: employeeId, // Az alkalmazott azonosítója
                shiftDate: updatedShift.shiftDate, // Dátum (yyyy-MM-dd formátumban)
                shiftStart: updatedShift.shiftStart, // Kezdési idő (HH:mm formátumban)
                shiftEnd: updatedShift.shiftEnd, // Befejezési idő (HH:mm formátumban)
                isLeave: updatedShift.isLeave || false, // Szabadság-e
                deleteLeaveIfOverlap: true, // Szabadság törlése, ha átfedés van
            }),
        });

        if (!response.ok) {
            throw new Error("Nem sikerült frissíteni a műszak adatait.");
        }
    } catch (error) {
        console.error("Hiba a műszak frissítésekor:", error);
        throw error;
    }
};




export { getAllEmployeeSchedules };
