import  { useState, useEffect } from "react";
import restaurantStyles from "./Restaurant.module.css";
import config from "../../../../config.js";

function Restaurant() {
    const [menuItems, setMenuItems] = useState([]);
    const [mealTypes, setMealTypes] = useState([]);
    const [selectedMealType, setSelectedMealType] = useState("");

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
            .catch((error) => console.error("Hiba történt az adatok betöltésekor:", error));
    }, []);

    const handleFilterChange = (e) => {
        setSelectedMealType(e.target.value);
    };

    return (
        <div className={restaurantStyles["restaurant-content"]}>
            <h2 className={restaurantStyles["restaurant-title"]}>Éttermi fogyasztás</h2>

            {/* Szűrő mező */}
            <div className={restaurantStyles["filter-container"]}>
                <label htmlFor="mealTypeFilter">Válassz ételtípust:</label>
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

            {/* Kártyák */}
            <div className={restaurantStyles["meal-cards-container"]}>
                {(selectedMealType ? menuItems[selectedMealType] : Object.values(menuItems).flat())
                    ?.map((item) => (
                        <div key={item.itemId} className={restaurantStyles["meal-card"]}>
                            {/* Elülső oldal */}
                            <div className={restaurantStyles["card-front"]}>
                                {/* Kép hozzáadása az elülső oldalhoz */}
                                <img
                                    src={item.url}
                                    alt={item.name}
                                    className={restaurantStyles["meal-card-image"]}
                                />
                                <h4 className={restaurantStyles["meal-card-title"]}>
                                    {item.name}
                                </h4>

                            </div>

                            {/* Hátsó oldal */}
                            <div className={restaurantStyles["card-back"]}>
                                <p className={restaurantStyles["meal-card-price"]}>
                                    {item.price} Ft
                                </p>
                                <input
                                    type="number"
                                    placeholder="Darab"
                                    min="1"
                                    className={restaurantStyles["meal-card-quantity"]}
                                />
                                <button className={restaurantStyles["add-to-order-button"]}>
                                    Hozzáadás
                                </button>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default Restaurant;
