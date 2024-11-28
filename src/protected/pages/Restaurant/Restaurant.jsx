import { useState, useEffect } from "react";
import restaurantStyles from "./Restaurant.module.css";
import config from "../../../../config.js";

function Restaurant() {
    const [menuItems, setMenuItems] = useState([]);
    const [mealTypes, setMealTypes] = useState([]);
    const [selectedMealType, setSelectedMealType] = useState("");
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [occupiedRooms, setOccupiedRooms] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");

    useEffect(() => {
        // Menü elemek betöltése
        fetch(`${config.bookingApiBaseUrl}/api/MealTypeFilter`)
            .then((response) => response.json())
            .then((data) => {
                const groupedData = data.reduce((acc, item) => {
                    if (!acc[item.mealTypeName]) acc[item.mealTypeName] = [];
                    acc[item.mealTypeName].push(item);
                    return acc;
                }, {});
                setMenuItems(groupedData);
                setMealTypes(Object.keys(groupedData));
            })
            .catch((error) =>
                console.error("Hiba történt az adatok betöltésekor:", error)
            );

        // Foglalt szobák lekérdezése a mai napra
        fetch(`${config.bookingApiBaseUrl}/api/filters/roomstatus/today`)
            .then((response) => response.json())
            .then((data) => {
                const occupied = data.filter((room) => room.status === "Foglalt");
                setOccupiedRooms(occupied.map((room) => room.roomId));
            })
            .catch((error) =>
                console.error("Hiba történt a szobák státuszának betöltésekor:", error)
            );
    }, []);

    const handleFilterChange = (e) => {
        setSelectedMealType(e.target.value);
    };

    const handleAddToOrder = (item) => {
        setSelectedItems((prevItems) => {
            const existingItem = prevItems.find((i) => i.itemId === item.itemId);
            if (existingItem) {
                return prevItems.map((i) =>
                    i.itemId === item.itemId
                        ? { ...i, quantity: i.quantity + 1 }
                        : i
                );
            } else {
                return [...prevItems, { ...item, quantity: 1 }];
            }
        });
    };

    const handleRemoveFromOrder = (item) => {
        setSelectedItems((prevItems) => {
            const existingItem = prevItems.find((i) => i.itemId === item.itemId);
            if (existingItem.quantity === 1) {
                return prevItems.filter((i) => i.itemId !== item.itemId);
            } else {
                return prevItems.map((i) =>
                    i.itemId === item.itemId
                        ? { ...i, quantity: i.quantity - 1 }
                        : i
                );
            }
        });
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
                const response = await fetch(
                    `${config.bookingApiBaseUrl}/api/OrderProcessing/createOrder`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(orderPayload),
                    }
                );

                if (response.ok) {
                    const result = await response.json();
                    setPopupMessage(
                        `Rendelés sikeresen rögzítve a(z) ${selectedRoom}. szobához.`
                    );
                } else {
                    throw new Error("Nem sikerült a rendelés rögzítése.");
                }
            } catch (error) {
                setPopupMessage("Hiba történt a rendelés rögzítése során.");
            }

            setShowPopup(true);
            setSelectedItems([]); // Kosár ürítése
        } else {
            alert("Kérjük, válasszon szobát és adjon hozzá rendelési tételt!");
        }
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const totalAmount = selectedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <div className={restaurantStyles["restaurant-container"]}>
            {/* Bal oldali fő tartalom */}
            <div className={restaurantStyles["main-content"]}>
                <h2 className={restaurantStyles["restaurant-title"]}>
                    Éttermi fogyasztás
                </h2>

                {/* Kártyák */}
                <div className={restaurantStyles["meal-cards-container"]}>
                    {(selectedMealType
                            ? menuItems[selectedMealType]
                            : Object.values(menuItems).flat()
                    )?.map((item) => (
                        <div
                            key={item.itemId}
                            className={restaurantStyles["meal-card"]}
                            onClick={() => handleAddToOrder(item)}
                        >
                            <div className={restaurantStyles["card-front"]}>
                                <img
                                    src={item.url}
                                    alt={item.name}
                                    className={restaurantStyles["meal-card-image"]}
                                />
                                <h4 className={restaurantStyles["meal-card-title"]}>
                                    {item.name}
                                </h4>
                            </div>
                            <div className={restaurantStyles["card-back"]}>
                                <p className={restaurantStyles["meal-card-price"]}>
                                    {item.price} Ft
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Jobb oldali panel */}
            <div className={restaurantStyles["sidebar"]}>
                {/* Szűrő */}
                <div className={restaurantStyles["filter-container"]}>
                    <label htmlFor="mealTypeFilter">Típus</label>
                    <select
                        id="mealTypeFilter"
                        value={selectedMealType}
                        onChange={handleFilterChange}
                        className={restaurantStyles["meal-type-filter"]}
                    >
                        <option value="">Összes</option>
                        {mealTypes.map((mealType) => (
                            <option key={mealType} value={mealType}>
                                {mealType}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Kosár összegzés */}
                <div className={restaurantStyles["order-summary"]}>
                    <h3>Kosár</h3>
                    <ul>
                        {selectedItems.map((item) => (
                            <li key={item.itemId}>
                                <div className={restaurantStyles["item-controls"]}>
                                    <button
                                        className={`${restaurantStyles["quantity-button"]} ${restaurantStyles["decrease"]}`}
                                        onClick={() => handleRemoveFromOrder(item)}
                                    >
                                        -
                                    </button>
                                    <button
                                        className={`${restaurantStyles["quantity-button"]} ${restaurantStyles["increase"]}`}
                                        onClick={() => handleAddToOrder(item)}
                                    >
                                        +
                                    </button>
                                    <span>
                                        {item.name} - {item.quantity} db -{" "}
                                        {item.price * item.quantity} Ft
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <h4>Összesen: {totalAmount} Ft</h4>

                    {/* Szobaszám kiválasztása */}
                    <div className={restaurantStyles["room-selection"]}>
                        <label htmlFor="roomNumber">Szobaszám:</label>
                        <select
                            id="roomNumber"
                            value={selectedRoom || ""}
                            onChange={handleRoomChange}
                            className={restaurantStyles["room-dropdown"]}
                        >
                            <option value="" disabled>
                                Válassz szobát
                            </option>
                            {occupiedRooms.map((roomId) => (
                                <option key={roomId} value={roomId}>
                                    {roomId}
                                </option>
                            ))}
                        </select>
                        <button
                            className={restaurantStyles["add-order-button"]}
                            disabled={!selectedRoom || selectedItems.length === 0}
                            onClick={handleAddOrderToRoom}
                        >
                            Hozzáadás
                        </button>
                    </div>
                </div>
            </div>

            {/* Felugró ablak */}
            {showPopup && (
                <div className={restaurantStyles["popup"]}>
                    <div className={restaurantStyles["popup-content"]}>
                        <p>{popupMessage}</p>
                        <button onClick={handleClosePopup}>OK</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Restaurant;
