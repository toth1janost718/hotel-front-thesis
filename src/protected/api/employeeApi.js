import config from "../../../config.js";

const getEmployeeSchedules = async () => {
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

export { getEmployeeSchedules };
