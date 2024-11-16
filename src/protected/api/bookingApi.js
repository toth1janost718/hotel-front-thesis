import config from '../../../config.js';

const API_BASE_URL = `${config.bookingApiBaseUrl}/api/filters`; // Használjuk a bookingApiBaseUrl-t

// Szobák státuszának lekérése adott dátumra
export const fetchRoomStatuses = async (date = "today") => {
    try {
        const response = await fetch(`${API_BASE_URL}/roomstatus/${date}`);
        if (!response.ok) {
            throw new Error("Hiba történt az API hívás során.");
        }
        return await response.json();
    } catch (error) {
        console.error("API hívási hiba:", error);
        throw error;
    }
};

