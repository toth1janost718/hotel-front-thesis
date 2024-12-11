import React from 'react';
import restaurantStyles from "../Restaurant.module.css";


const MealCards = ({ menuItems, selectedMealType, addItem }) => (
    <div className={restaurantStyles["meal-cards-container"]}>
        {(selectedMealType
                ? menuItems[selectedMealType]
                : Object.values(menuItems).flat()
        )?.map((item) => (
            <div
                key={item.itemId}
                className={restaurantStyles["meal-card"]}
                onClick={() => addItem(item)}
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
);

export default MealCards;
