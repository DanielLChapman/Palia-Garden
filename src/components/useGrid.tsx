import { Crop } from "@/data/crops";
import { CellEffects } from "./Effects";
import { Fertilizer } from "@/data/fertilizer";
import { useCallback, useEffect, useState } from "react";

export type GridCell = {
    crop: Crop | null;
    effects: CellEffects;
    fertilizer: Fertilizer | null;
    primaryCoord: [number, number] | null;
    starred?: "regular" | "starred";
    needFertilizer: boolean;
};

export type GridState = GridCell[][];

export function useGrid(): {
    grid: GridState;
    setGrid: (value: GridState) => void;
    recheckLocalStorage: () => void;
    saveGridToLocalStorage: (value: GridState) => void
} {
    // Initialize the grid state without setting it directly to an empty grid
    const [grid, setGrid] = useState<GridState | null>(null);

    // Load the grid from localStorage only once when the component mounts
    useEffect(() => {
        const loadGridFromLocalStorage = () => {
            const storedValue = localStorage.getItem("grid");
            if (storedValue) {
                try {
                    setGrid(JSON.parse(storedValue));
                } catch (e) {
                    console.error("Failed to parse grid from localStorage:", e);
                    // Fallback to empty grid if there's an error
                    setGrid(
                        Array.from({ length: 9 }, () =>
                            Array.from({ length: 9 }, createEmptyCell)
                        )
                    );
                }
            } else {
                // Set to empty grid if nothing is in localStorage
                setGrid(
                    Array.from({ length: 9 }, () =>
                        Array.from({ length: 9 }, createEmptyCell)
                    )
                );
            }
        };

        loadGridFromLocalStorage();
    }, []);

    const recheckLocalStorage = useCallback(() => {
        try {
            const storedValue = localStorage.getItem("grid");
            if (storedValue) {
                setGrid(JSON.parse(storedValue));
            }
        } catch (e) {
            console.error("Failed to parse grid from localStorage:", e);
        }
    }, []);

    const saveGridToLocalStorage = useCallback((value: GridState) => {
        try {
            localStorage.setItem("grid", JSON.stringify(value));
        } catch (e) {
            console.error("Failed to save grid to localStorage:", e);
        }
    }, []);


    if (grid === null) {
        return {
            grid: Array.from({ length: 9 }, () =>
                Array.from({ length: 9 }, createEmptyCell)
            ),
            setGrid,
            recheckLocalStorage,
            saveGridToLocalStorage
        };
    }

    return {
        grid,
        setGrid,
        recheckLocalStorage,
        saveGridToLocalStorage
    };
}

function createEmptyCell(): GridCell {
    return {
        crop: null,
        effects: [],
        fertilizer: null,
        primaryCoord: null,
        starred: "regular",
        needFertilizer: true,
    };
}
