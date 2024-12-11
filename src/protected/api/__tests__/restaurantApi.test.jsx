import { fetchMenuItems, fetchOccupiedRooms, createOrder } from "../restaurantApi.js";
import { fetchApiData } from "../apiHelpers.js";

jest.mock("../apiHelpers.js"); // Mock-oljuk az API segédfüggvényt
/**
 * Tesztek a Restaurant API függvényeinek tesztelésére.
 * Az alábbi tesztkészlet ellenőrzi:
 * 1. Menüelemek lekérése és csoportosítása (fetchMenuItems).
 * 2. Foglalt szobák lekérése (fetchOccupiedRooms).
 * 3. Rendelés rögzítése az API-ban (createOrder).
 * A hibakezelés tesztelése során a konzol üzenetek elnyomása érdekében mock-oljuk a `console.error` metódust.
 * A
 */
describe("Restaurant API függvények", () => {
    const originalConsoleError = console.error;

    beforeAll(() => {
        console.error = jest.fn(); // Mock-oljuk a console.error-t, hogy elkerüljük a zajt a tesztek során
    });

    afterAll(() => {
        console.error = originalConsoleError; // Visszaállítjuk az eredeti console.error-t
    });

    afterEach(() => {
        jest.clearAllMocks(); // Tesztek között tisztítjuk a mock-okat
    });

    describe("fetchMenuItems", () => {
        it("sikeresen lekéri és csoportosítja a menüelemeket", async () => {
            const mockApiResponse = [
                { mealTypeName: "Reggeli", itemId: 1, name: "Palacsinta" },
                { mealTypeName: "Reggeli", itemId: 2, name: "Omlett" },
                { mealTypeName: "Ebéd", itemId: 3, name: "Leves" },
            ];
            fetchApiData.mockResolvedValue(mockApiResponse);

            const result = await fetchMenuItems();

            expect(fetchApiData).toHaveBeenCalledWith("/api/MealTypeFilter", {
                baseUrl: "bookingApiBaseUrl",
            });
            expect(result).toEqual({
                menuItems: {
                    Reggeli: [
                        { mealTypeName: "Reggeli", itemId: 1, name: "Palacsinta" },
                        { mealTypeName: "Reggeli", itemId: 2, name: "Omlett" },
                    ],
                    Ebéd: [{ mealTypeName: "Ebéd", itemId: 3, name: "Leves" }],
                },
                mealTypes: ["Reggeli", "Ebéd"],
            });
        });

        it("hiba esetén kivételt dob", async () => {
            fetchApiData.mockRejectedValue(new Error("API hiba"));

            await expect(fetchMenuItems()).rejects.toThrow("API hiba");
            expect(fetchApiData).toHaveBeenCalledTimes(1);
        });
    });

    describe("fetchOccupiedRooms", () => {
        it("sikeresen lekéri a foglalt szobák azonosítóit", async () => {
            const mockApiResponse = [
                { roomId: 101, status: "Foglalt" },
                { roomId: 102, status: "Szabad" },
                { roomId: 103, status: "Foglalt" },
            ];
            fetchApiData.mockResolvedValue(mockApiResponse);

            const result = await fetchOccupiedRooms();

            expect(fetchApiData).toHaveBeenCalledWith("/api/filters/roomstatus/today", {
                baseUrl: "bookingApiBaseUrl",
            });
            expect(result).toEqual([101, 103]);
        });

        it("hiba esetén kivételt dob", async () => {
            fetchApiData.mockRejectedValue(new Error("API hiba"));

            await expect(fetchOccupiedRooms()).rejects.toThrow("API hiba");
            expect(fetchApiData).toHaveBeenCalledTimes(1);
        });
    });

    describe("createOrder", () => {
        it("sikeresen elküldi a rendelést", async () => {
            const mockOrderPayload = {
                RoomId: 101,
                Items: [
                    { MenuItemId: 1, Quantity: 2 },
                    { MenuItemId: 2, Quantity: 1 },
                ],
            };

            fetchApiData.mockResolvedValue();

            await createOrder(mockOrderPayload);

            expect(fetchApiData).toHaveBeenCalledWith("/api/OrderProcessing/createOrder", {
                baseUrl: "bookingApiBaseUrl",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(mockOrderPayload),
            });
        });

        it("hiba esetén kivételt dob", async () => {
            fetchApiData.mockRejectedValue(new Error("API hiba"));

            await expect(createOrder({})).rejects.toThrow("API hiba");
            expect(fetchApiData).toHaveBeenCalledTimes(1);
        });
    });
});
