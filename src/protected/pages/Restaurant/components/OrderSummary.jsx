import React from "react";
import restaurantStyles from "./../Restaurant.module.css";

/**
 * OrderSummary - Rendelési összegzés és műveletek
 *
 * Ez a komponens kezeli a kosár tartalmát, összegzését és a szobák kiválasztását,
 * valamint a rendelés leadásához szükséges adatokat.
 *
 * Props:
 * - `selectedItems` (Array<Object>): A kosárban lévő tételek listája.
 * - `removeItem` (function): Callback függvény egy tétel mennyiségének csökkentéséhez.
 * - `addItem` (function): Callback függvény egy tétel mennyiségének növeléséhez.
 * - `totalAmount` (number): A kosár teljes értéke.
 * - `occupiedRooms` (Array<number>): A foglalt szobák listája.
 * - `selectedRoom` (number | null): Az aktuálisan kiválasztott szoba.
 * - `onRoomChange` (function): Callback függvény a szobaválasztás változására.
 * - `onAddOrder` (function): Callback függvény a rendelés leadásához.
 *
 */


const OrderSummary = ({
                          selectedItems,
                          removeItem,
                          addItem,
                          totalAmount,
                          occupiedRooms,
                          selectedRoom,
                          onRoomChange,
                          onAddOrder,
                      }) => (
    <div className={restaurantStyles["order-summary"]}>
        <h3>Kosár</h3>
        <ul>
            {selectedItems.map((item) => (
                <li key={item.itemId}>
                    <div className={restaurantStyles["item-controls"]}>
                        <button
                            className={`${restaurantStyles["quantity-button"]} ${restaurantStyles["decrease"]}`}
                            onClick={() => removeItem(item)}
                        >
                            -
                        </button>
                        <button
                            className={`${restaurantStyles["quantity-button"]} ${restaurantStyles["increase"]}`}
                            onClick={() => addItem(item)}
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

        <div className={restaurantStyles["room-selection"]}>
            <label htmlFor="roomNumber">Szobaszám:</label>
            <select
                id="roomNumber"
                value={selectedRoom || ""}
                onChange={onRoomChange}
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
                onClick={onAddOrder}
            >
                Hozzáadás
            </button>
        </div>
    </div>
);

export default OrderSummary;
