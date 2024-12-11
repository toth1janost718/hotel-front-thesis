import { useState } from "react";

/**
 * useCart - Egyedi React hook a rendelési kosár kezeléséhez
 *
 * Ez a hook biztosítja a rendelési kosár logikáját, beleértve:
 * - Tételek hozzáadása a kosárhoz.
 * - Tételek eltávolítása a kosárból.
 * - Kosár ürítése.
 * - Kosár összegének kiszámítása.
 *
 * Visszatérési értékek:
 * - `selectedItems`: A kosárban lévő tételek tömbje.
 * - `addItem(item)`: Egy tétel hozzáadása a kosárhoz. Ha a tétel már létezik, növeli a mennyiséget.
 * - `removeItem(item)`: Egy tétel eltávolítása a kosárból. Ha a mennyiség 1, teljesen eltávolítja a tételt.
 * - `clearCart()`: A kosár összes elemének törlése.
 * - `calculateTotal()`: Az összes tétel teljes árának kiszámítása.
 *
 * Használat:
 * - Importáld a hook-ot: `import { useCart } from './useCart';`
 * - Használat a komponensben: `const { addItem, removeItem, selectedItems, calculateTotal } = useCart();`
 */


export const useCart = () => {
    const [selectedItems, setSelectedItems] = useState([]);

    const addItem = (item) => {
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

    const removeItem = (item) => {
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

    const clearCart = () => {
        setSelectedItems([]);
    };

    const calculateTotal = () => {
        return selectedItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );
    };

    return {
        selectedItems,
        addItem,
        removeItem,
        clearCart,
        calculateTotal,
    };
};
