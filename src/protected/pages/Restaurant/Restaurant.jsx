import {useState, useEffect} from "react";
import restaurantStyles from "./Restaurant.module.css";
import {fetchMenuItems, fetchOccupiedRooms, createOrder} from "../../api/restaurantApi.js";
import {useCart} from "../../hooks/restaurant/useCart.js";
import {usePopup} from "../../hooks/restaurant/usePopup.js";
import MealCards from "./components/MealCards.jsx";
import FilterDropdown from "./components/FilterDropdown.jsx";
import OrderSummary from "./components/OrderSummary.jsx";
/**
 * Restaurant - Fő komponens az éttermi rendelési rendszer megjelenítéséhez és kezeléséhez.
 *
 * Funkcionalitások:
 * 1. **Menüelemek betöltése**:
 *    - Az étkezési típusok és menüelemek dinamikusan betöltődnek az API-ból.
 *    - Az adatok egy szűrőn keresztül kiválaszthatók.
 *
 * 2. **Foglaltsági adatok kezelése**:
 *    - A mai napon foglalt szobák listája betöltődik az API-ból.
 *    - A felhasználó kiválaszthat egy szobát rendelés rögzítéséhez.
 *
 * 3. **Kosár logika**:
 *    - Tételek hozzáadása, eltávolítása és a teljes összeg kiszámítása.
 *    - A `useCart` hook biztosítja a kosár logikáját.
 *
 * 4. **Felugró értesítések kezelése**:
 *    - A rendelés sikeres rögzítéséről vagy hibaüzenetekről értesítést kap a felhasználó.
 *    - A `usePopup` hook kezeli a felugró ablakokat.
 *
 * 5. **Moduláris komponensek használata**:
 *    - **MealCards**: A menüelemeket megjelenítő komponens.
 *    - **FilterDropdown**: Az étkezési típusok szűréséhez.
 *    - **OrderSummary**: A kosár tartalmának összegzése és rendelési folyamat.
 *
 * React hook-ok:
 * - `useState`: Az alkalmazás állapotának kezelésére (pl. menüelemek, foglalt szobák).
 * - `useEffect`: Az adatok betöltésére az API-ból.
 *
 * API használat:
 * - Az `api/restaurantApi.js` fájl kezeli az összes API-hívást.
 * - Funkciók: `fetchMenuItems`, `fetchOccupiedRooms`, `createOrder`.
 *
 * Főbb elemek:
 * - Betöltésjelző állapot (`isLoading`).
 * - Kosárkezelés (hozzáadás, eltávolítás, összegzés).
 * - Szobaszám kiválasztása és rendelés rögzítése.
 */

function Restaurant() {
    const [menuItems, setMenuItems] = useState([]);
    const [mealTypes, setMealTypes] = useState([]);
    const [selectedMealType, setSelectedMealType] = useState("");
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [occupiedRooms, setOccupiedRooms] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Kosár logika a useCart hook-ból
    const {selectedItems, addItem, removeItem, clearCart, calculateTotal} = useCart();

    // Felugró ablak logika a usePopup hook-ból
    const {showPopup, popupMessage, openPopup, closePopup} = usePopup();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const {menuItems, mealTypes} = await fetchMenuItems();
                setMenuItems(menuItems);
                setMealTypes(mealTypes);

                const occupied = await fetchOccupiedRooms();
                setOccupiedRooms(occupied);
            } catch (error) {
                console.error("Hiba történt az adatok betöltésekor:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleFilterChange = (e) => {
        setSelectedMealType(e.target.value);
    };

    const handleRoomChange = (e) => {
        setSelectedRoom(parseInt(e.target.value, 10)); // Szobaszám kiválasztása
    };

    const handleAddOrderToRoom = async () => {
        if (selectedRoom && selectedItems.length > 0) {
            const orderPayload = {
                RoomId: selectedRoom,
                Items: selectedItems.map((item) => ({
                    MenuItemId: item.itemId,
                    Quantity: item.quantity,
                })),
            };

            try {
                await createOrder(orderPayload);
                openPopup(`Rendelés sikeresen rögzítve a(z) ${selectedRoom}. szobához.`);
                clearCart(); // Kosár ürítése
                // eslint-disable-next-line no-unused-vars
            } catch (error) {
                openPopup("Hiba történt a rendelés rögzítése során.");
            }
        } else {
            alert("Kérjük, válasszon szobát és adjon hozzá rendelési tételt!");
        }
    };

    const totalAmount = calculateTotal();

    if (isLoading) {
        return <div className={restaurantStyles["loading"]}>Betöltés...</div>;
    }

    return (
        <div className={restaurantStyles["restaurant-container"]}>
            {/* Bal oldali fő tartalom */}
            <div className={restaurantStyles["main-content"]}>
                <h2 className={restaurantStyles["restaurant-title"]}>
                    Éttermi fogyasztás
                </h2>

                {/* Kártyák */}
                <MealCards
                    menuItems={menuItems}
                    selectedMealType={selectedMealType}
                    addItem={addItem}
                />
            </div>

            {/* Jobb oldali panel */}
            <div className={restaurantStyles["sidebar"]}>
                {/* Szűrő */}
                <FilterDropdown
                    mealTypes={mealTypes}
                    selectedMealType={selectedMealType}
                    onFilterChange={handleFilterChange}
                />

                {/* Kosár összegzés */}
                <OrderSummary
                    selectedItems={selectedItems}
                    removeItem={removeItem}
                    addItem={addItem}
                    totalAmount={totalAmount}
                    occupiedRooms={occupiedRooms}
                    selectedRoom={selectedRoom}
                    onRoomChange={handleRoomChange}
                    onAddOrder={handleAddOrderToRoom}
                />
            </div>

            {/* Felugró ablak */}
            {showPopup && (
                <div className={restaurantStyles["popup"]}>
                    <div className={restaurantStyles["popup-content"]}>
                        <p>{popupMessage}</p>
                        <button onClick={closePopup}>OK</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Restaurant;
