import config from '../../../config.js';

const API_BASE_URL = (`${config.bookingApiBaseUrl}/api/BookingManage/create`);

export const saveBookingToApi = async (bookingData) => {
    try {
        const response = await fetch(API_BASE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bookingData),
        });

        if (!response.ok) {
            throw new Error("Hiba történt a foglalás mentésekor.");
        }

        const result = await response.json();
        console.log("Foglalás sikeresen mentve:", result);
        return result;
    } catch (error) {
        console.error("Hiba:", error.message);
        throw error;
    }
};



export const fetchRoomTypesWithRooms = async (date) => {
    const response = await fetch(`${config.bookingApiBaseUrl}/api/filters/roomstatus/types/${date}`);
    if (!response.ok) {
        throw new Error("Hiba történt az API hívás során");
    }
    return response.json();
};

export const fetchRoomTypesWithCapacity = async () => {
    const response = await fetch(`${config.bookingApiBaseUrl}/api/filters/roomstatus/types`);
    if (!response.ok) {
        throw new Error("Hiba történt az API hívás során");
    }
    return response.json();
};




