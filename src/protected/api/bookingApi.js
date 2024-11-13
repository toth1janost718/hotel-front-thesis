import config from '../../../config.js';

export const fetchRooms = async () => {
    try {
        const response = await fetch(`${config.bookingApiBaseUrl}/api/Room`);
        return await response.json();
    } catch (error) {
        console.error("Hiba történt a szobák adatainak lekérésekor:", error);
        throw error;
    }
};

export const fetchRoomStatusForDay = async (date) => {
    const formattedDate = date.toISOString().split('T')[0];
    try {
        const response = await fetch(`${config.bookingApiBaseUrl}/api/RoomStatus/RoomBookingsForDay?date=${formattedDate}`);
        return await response.json();
    } catch (error) {
        console.error("Hiba történt a szobastátusz adatainak lekérésekor:", error);
        throw error;
    }
};


