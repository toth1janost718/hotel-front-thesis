import { fetchApiData } from "./apiHelpers.js";

/**
 * Menüelemek és étkezési típusok lekérése az API-ból.
 * Az adatokat csoportosítja étkezési típusok szerint.
 */
export const fetchMenuItems = async () => {
    try {
        const data = await fetchApiData("/api/MealTypeFilter", {
            baseUrl: "bookingApiBaseUrl", // Booking API alap URL használata
        });

        const groupedData = data.reduce((acc, item) => {
            if (!acc[item.mealTypeName]) acc[item.mealTypeName] = [];
            acc[item.mealTypeName].push(item);
            return acc;
        }, {});

        return {
            menuItems: groupedData,
            mealTypes: Object.keys(groupedData),
        };
    } catch (error) {
        console.error("Hiba történt a menüelemek betöltésekor:", error);
        throw error;
    }
};

/**
 * Foglalt szobák lekérése az API-ból a mai napra.
 */
export const fetchOccupiedRooms = async () => {
    try {
        const data = await fetchApiData("/api/filters/roomstatus/today", {
            baseUrl: "bookingApiBaseUrl", // Booking API alap URL használata
        });

        return data
            .filter((room) => room.status === "Foglalt")
            .map((room) => room.roomId);
    } catch (error) {
        console.error("Hiba történt a szobák státuszának betöltésekor:", error);
        throw error;
    }
};


/**
 * Rendelés rögzítése az API-ban.
 * @param {Object} orderPayload - A rendelési adatok payload-ja.
 */
export const createOrder = async (orderPayload) => {
    try {
        await fetchApiData("/api/OrderProcessing/createOrder", {
            baseUrl: "bookingApiBaseUrl",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(orderPayload),
        });
    } catch (error) {
        console.error("Hiba történt a rendelés rögzítésekor:", error);
        throw error;
    }
};