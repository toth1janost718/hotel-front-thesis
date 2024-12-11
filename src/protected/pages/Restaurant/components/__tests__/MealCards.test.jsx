import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import MealCards from "../MealCards.jsx";

describe("MealCards Komponens", () => {
    const mockMenuItems = {
        Breakfast: [
            { itemId: 1, name: "Palacsinta", price: 1000 },
            { itemId: 2, name: "Omlett", price: 800 },
        ],
    };

    const mockAddItem = jest.fn();

    it("minden menüelemet megjelenít, ha nincs szűrő alkalmazva", () => {
        render(<MealCards menuItems={mockMenuItems} selectedMealType="" addItem={mockAddItem} />);
        const items = screen.getAllByText(/Palacsinta|Omlett/i);
        expect(items).toHaveLength(2); // Két elem jelenik meg
    });

    it("csak a szűrt elemeket jeleníti meg, ha egy szűrő alkalmazva van", () => {
        render(<MealCards menuItems={mockMenuItems} selectedMealType="Breakfast" addItem={mockAddItem} />);
        const items = screen.getAllByText(/Palacsinta|Omlett/i);
        expect(items).toHaveLength(2); // Csak a reggelis elemek jelennek meg
    });

    it("meghívja az addItem függvényt, amikor egy kártyára kattintanak", () => {
        render(<MealCards menuItems={mockMenuItems} selectedMealType="Breakfast" addItem={mockAddItem} />);
        const firstCard = screen.getByText("Palacsinta");
        fireEvent.click(firstCard);
        expect(mockAddItem).toHaveBeenCalledWith(mockMenuItems.Breakfast[0]); // Az első elem hozzáadása
    });

    it("nem jelenít meg semmit, ha a menuItems üres", () => {
        render(<MealCards menuItems={{}} selectedMealType="Breakfast" addItem={mockAddItem} />);
        const items = screen.queryAllByText(/.+/i);
        expect(items).toHaveLength(0); // Nincs megjelenített elem
    });
});
