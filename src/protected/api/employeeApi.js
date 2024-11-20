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




export { getAllEmployeeSchedules };
