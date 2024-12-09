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


export const fetchRoomPriceByType = async (roomTypeId) => {
    const response = await fetch(`${config.bookingApiBaseUrl}/api/RoomPriceFilter/${roomTypeId}`);
    if (!response.ok) {
        throw new Error("Nem sikerült lekérni a szoba árait.");
    }
    return response.json();
};

export const fetchInvoicesFromApi = async (filter) => {
    try {
        const response = await fetch(`${config.bookingApiBaseUrl}/api/Billing/rooms-total-billing`, );
        if (!response.ok) {
            throw new Error("Nem sikerült lekérni a számlák adatait.");
        }

        const data = await response.json();
        return data.filter(invoice =>
            filter === "Nyitott" ? !invoice.isPaid : invoice.isPaid
        );
    } catch (error) {
        console.error("Hiba történt a számlák lekérésekor:", error.message);
        throw error;
    }
};

export const markInvoiceAsPaid = async (orderId) => {
    try {
        const response = await fetch(`${config.bookingApiBaseUrl}/api/Order/mark-as-paid/${orderId}`, {
            method: "PUT",
            headers: {
                "Accept": "*/*",
            },
        });

        if (!response.ok) {
            throw new Error("Hiba történt a számla státuszának frissítésekor.");
        }

        console.log(`Számla ${orderId} státusza sikeresen frissítve.`);
        return response;
    } catch (error) {
        console.error("Hiba a számla státuszának frissítésekor:", error.message);
        throw error;
    }
};

export const fetchUnpaidOrdersForRoom = async (roomNumber) => {
    try {
        const response = await fetch(`${config.bookingApiBaseUrl}/api/Billing/unpaid-orders`);
        if (!response.ok) {
            throw new Error("Nem sikerült betölteni a fogyasztási részleteket.");
        }

        const data = await response.json();

        // Szűrjük ki a megadott szobaszámhoz tartozó rendeléseket
        const roomDetails = data.find(order => order.roomNumber === roomNumber);

        if (!roomDetails) {
            throw new Error("Ehhez a szobához nincsenek elérhető rendelések.");
        }

        return roomDetails.unpaidOrders;
    } catch (error) {
        console.error("Hiba történt a fogyasztási részletek lekérésekor:", error.message);
        throw error;
    }
};








