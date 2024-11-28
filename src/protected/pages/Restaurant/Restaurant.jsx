import { useState, useEffect } from "react";
import restaurantStyles from "./Restaurant.module.css";
import config from "../../../../config.js";

function Restaurant() {
    const [menuItems, setMenuItems] = useState([]);
    const [mealTypes, setMealTypes] = useState([]);
    const [selectedMealType, setSelectedMealType] = useState("");
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(1);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
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
        setSelectedRoom(e.target.value);
    };

    const handleAddOrderToRoom = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        setSelectedItems([]); // Kosár ürítése
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
                    <label htmlFor="mealTypeFilter">Tipus</label>
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
                            value={selectedRoom}
                            onChange={handleRoomChange}
                        >
                            {Array.from({ length: 30 }, (_, i) => i + 1).map((room) => (
                                <option key={room} value={room}>
                                    {room}
                                </option>
                            ))}
                        </select>
                        <button
                            className={restaurantStyles["add-order-button"]}
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
                        <p>Rendelés a(z) {selectedRoom}.szobához rögzítve.</p>
                        <button onClick={handleClosePopup}>OK</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Restaurant;
