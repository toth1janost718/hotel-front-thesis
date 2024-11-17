import config from '../../../config.js';

const formatDateForApi = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const day = d.getDate().toString().padStart(2, "0");
    return `${year}.${month}.${day}`; // YYYY.MM.DD formátum
};

export const fetchRoomStatuses = async (date) => {
    const formattedDate = formatDateForApi(date); // Formázott dátum
    try {
        const response = await fetch(`${config.bookingApiBaseUrl}/api/filters/roomstatus/${formattedDate}`);
        if (!response.ok) {
            throw new Error("Hiba történt az API hívás során.");
        }
        return await response.json();
    } catch (error) {
        console.error("API hívási hiba:", error);
        throw error;
    }
};



