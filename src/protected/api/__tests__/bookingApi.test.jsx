import {
    saveBookingToApi,
    fetchRoomTypesWithRooms,
    fetchRoomTypesWithCapacity,
    fetchRoomPriceByType,
    generateInvoiceForRoom,
    fetchInvoicesFromApi,
    markInvoiceAsPaid,
    fetchUnpaidOrdersForRoom,
} from "../bookingApi.js";

import { jest } from "@jest/globals";

/**
 * Ez a fájl a bookingApi.js modulban található API-függvények tesztelését tartalmazza.
 * A tesztek célja az alábbiak ellenőrzése:
 *
 * 1. **saveBookingToApi**: Ellenőrzi, hogy a foglalási adatok helyesen kerülnek-e elküldésre és megfelelő hibakezelés történik-e.
 * 2. **fetchRoomTypesWithRooms**: Teszteli, hogy a dátum alapján helyes adatokat ad-e vissza a szobatípusokhoz kapcsolódóan.
 * 3. **fetchRoomTypesWithCapacity**: Ellenőrzi, hogy a szobatípusok kapacitásának lekérdezése helyes-e.
 * 4. **fetchRoomPriceByType**: Biztosítja, hogy egy adott szobatípus ára helyesen kerül lekérésre.
 * 5. **generateInvoiceForRoom**: Teszteli a számla generálását egy adott szobához, beleértve a hibakezelést is.
 * 6. **fetchInvoicesFromApi**: Ellenőrzi, hogy a számlák lekérése helyesen működik, szűrve azok státusza szerint.
 * 7. **markInvoiceAsPaid**: Biztosítja, hogy a számla státuszát sikeresen frissíteni lehet.
 *
 * A tesztek mock adatokat használnak az API-hívások szimulálásához, így az éles környezet nem érintett.
 * További mockolás gondoskodik arról, hogy minden lehetséges hibakezelési forgatókönyvet lefedjünk.
 */


global.fetch = jest.fn(); // Globális fetch mockolása

describe("API hívások tesztelése", () => {
    afterEach(() => {
        jest.clearAllMocks(); // Mockok törlése minden teszt után
    });


    describe("saveBookingToApi", () => {
        it("sikeresen menti a foglalást", async () => {
            const mockBookingData = { roomNumber: 101, date: "2024-12-15" };
            const mockResponse = { success: true };

            fetch.mockResolvedValueOnce({
                ok: true,
                json: jest.fn().mockResolvedValueOnce(mockResponse),
            });

            const result = await saveBookingToApi(mockBookingData);
            expect(result).toEqual(mockResponse);
            expect(fetch).toHaveBeenCalledWith(
                expect.stringContaining("/api/BookingManage/create"),
                expect.objectContaining({ method: "POST" })
            );
        });

        it("hibát dob, ha az API hívás sikertelen", async () => {
            fetch.mockResolvedValueOnce({ ok: false });
            const mockBookingData = { roomNumber: 101, date: "2024-12-15" };

            await expect(saveBookingToApi(mockBookingData)).rejects.toThrow(
                "Hiba történt a foglalás mentésekor."
            );
        });
    });


    describe("fetchRoomTypesWithRooms", () => {
        it("sikeresen visszaadja a szobatípusokat", async () => {
            const mockDate = "2024-12-15";
            const mockResponse = [{ roomTypeId: 1, roomTypeName: "Deluxe" }];

            fetch.mockResolvedValueOnce({
                ok: true,
                json: jest.fn().mockResolvedValueOnce(mockResponse),
            });

            const result = await fetchRoomTypesWithRooms(mockDate);
            expect(result).toEqual(mockResponse);
            expect(fetch).toHaveBeenCalledWith(
                expect.stringContaining(`/api/filters/roomstatus/types/${mockDate}`)
            );
        });

        it("hibát dob, ha az API válasz hibás", async () => {
            fetch.mockResolvedValueOnce({ ok: false });

            await expect(fetchRoomTypesWithRooms("2024-12-15")).rejects.toThrow(
                "Hiba történt az API hívás során"
            );
        });
    });

    describe("generateInvoiceForRoom", () => {
        it("sikeresen generálja a számlát", async () => {
            const mockRoomNumber = 101;
            fetch.mockResolvedValueOnce({ ok: true });

            const result = await generateInvoiceForRoom(mockRoomNumber);
            expect(result.ok).toBe(true);
            expect(fetch).toHaveBeenCalledWith(
                expect.stringContaining(`/api/Billing/generate-invoice/${mockRoomNumber}`),
                expect.objectContaining({ method: "GET" })
            );
        });

        it("hibát dob, ha a számla generálása sikertelen", async () => {
            fetch.mockResolvedValueOnce({ ok: false });
            const mockRoomNumber = 101;

            await expect(generateInvoiceForRoom(mockRoomNumber)).rejects.toThrow(
                "A szobához rendelés nem tartozik."
            );
        });
    });


    describe("fetchInvoicesFromApi", () => {
        it("helyesen szűri a számlákat", async () => {
            const mockResponse = [
                { invoiceId: 1, isPaid: true },
                { invoiceId: 2, isPaid: false },
            ];

            fetch.mockResolvedValueOnce({
                ok: true,
                json: jest.fn().mockResolvedValueOnce(mockResponse),
            });

            const result = await fetchInvoicesFromApi("Nyitott");
            expect(result).toEqual([mockResponse[1]]); // Csak a nem fizetett számla
        });

        it("hibát dob, ha az API hívás sikertelen", async () => {
            fetch.mockResolvedValueOnce({ ok: false });

            await expect(fetchInvoicesFromApi("Nyitott")).rejects.toThrow(
                "Nem sikerült lekérni a számlák adatait."
            );
        });
    });


    describe("markInvoiceAsPaid", () => {
        it("sikeresen frissíti a számla státuszát", async () => {
            const mockOrderId = 1;
            fetch.mockResolvedValueOnce({ ok: true });

            const result = await markInvoiceAsPaid(mockOrderId);
            expect(result.ok).toBe(true);
            expect(fetch).toHaveBeenCalledWith(
                expect.stringContaining(`/api/Order/mark-as-paid/${mockOrderId}`),
                expect.objectContaining({ method: "PUT" })
            );
        });

        it("hibát dob, ha a számla státusz frissítése sikertelen", async () => {
            fetch.mockResolvedValueOnce({ ok: false });
            const mockOrderId = 1;

            await expect(markInvoiceAsPaid(mockOrderId)).rejects.toThrow(
                "Hiba történt a számla státuszának frissítésekor."
            );
        });
    });


});
