import config from '../../../config.js';




export const fetchRoomTypesWithRooms = async (date) => {
    const response = await fetch(`${config.bookingApiBaseUrl}/api/filters/roomstatus/types/${date}`);
    if (!response.ok) {
        throw new Error("Hiba történt az API hívás során");
    }
    return response.json();
};




