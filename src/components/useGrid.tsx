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
} {
    const [grid, setGrid] = useState<GridState>(Array.from({ length: 9 }, () =>
        Array.from({ length: 9 }, createEmptyCell)
    ));

    useEffect(() => {
        const storedValue = localStorage.getItem('grid');
        if (storedValue) {
            try {
                setGrid(JSON.parse(storedValue));
            } catch (e) {
                console.error('Failed to parse grid from localStorage:', e);
            }
        }
    }, []);

    const recheckLocalStorage = useCallback(() => {
        try {
            const storedValue = localStorage.getItem('grid');
            if (storedValue) {
                setGrid(JSON.parse(storedValue));
            }
        } catch (e) {
            console.error('Failed to parse grid from localStorage:', e);
        }
    }, []);

    const saveGridToLocalStorage = useCallback((value: GridState) => {
        try {
            localStorage.setItem("grid", JSON.stringify(value));
        } catch (e) {
            console.error('Failed to save grid to localStorage:', e);
        }
    }, []);

    useEffect(() => {
        saveGridToLocalStorage(grid);
    }, [grid, saveGridToLocalStorage]);

    return {
        grid,
        setGrid,
        recheckLocalStorage
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
