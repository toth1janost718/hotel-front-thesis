import React from "react";
import restaurantStyles from "./../Restaurant.module.css";

/**
 * FilterDropdown - Szűrő komponens az étkezési típusokhoz
 *
 * Ez a komponens egy lenyíló menüt jelenít meg, amely lehetővé teszi az
 * étkezési típusok alapján történő szűrést.
 *
 * Props:
 * - `mealTypes` (Array<string>): Az elérhető étkezési típusok listája.
 * - `selectedMealType` (string): Az aktuálisan kiválasztott étkezési típus.
 * - `onFilterChange` (function): Callback függvény, amely a szűrő változására reagál.
 *
  */


const FilterDropdown = ({ mealTypes, selectedMealType, onFilterChange }) => (
    <div className={restaurantStyles["filter-container"]}>
        <label htmlFor="mealTypeFilter">Típus</label>
        <select
            id="mealTypeFilter"
            value={selectedMealType}
            onChange={onFilterChange}
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
);

export default FilterDropdown;
