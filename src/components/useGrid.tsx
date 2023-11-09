import { Crop, crops, getCropById } from "@/data/crops";
import { CellEffects } from "./Effects";
import { Fertilizer, getFertilizerById } from "@/data/fertilizer";
import { useCallback, useEffect, useState } from "react";
import { compressToBase64, decompressFromBase64 } from "lz-string";

export type GridCell = {
    crop: Crop | null;
    effects: CellEffects;
    fertilizer: Fertilizer | null;
    primaryCoord: [number, number] | null;
    starred?: "regular" | "starred";
    needFertilizer: boolean;
};

export type GridState = GridCell[][];


function serialized(grid: GridState): string {
    try {
        let serialized = grid
            .map((row) =>
                row
                    .map((cell) => {
                        let t = `${cell.crop ? cell.crop.id : "0"}:${
                            cell.fertilizer ? cell.fertilizer.id : "0"
                        }`;
                        t += `:${cell.primaryCoord ? cell.primaryCoord.join('~') : "-1~-1"}`;
                        t += `:${cell.starred === 'starred' ? "2" : "1"}`;
                        return t;
                    })
                    .join(",")
            )
            .join(";");

        let compressed = compressToBase64(serialized); // Make sure you have a compress function
        console.log(compressed)
        let base64Encoded = btoa(compressed);
        return base64Encoded;
    } catch (error) {
        console.error('Failed to serialize grid:', error);
        return ''; // Return an empty string or handle the error as appropriate
    }
}


function deserialized(serialzied: string): GridState {
    let compressed = atob(serialzied);
    let decompressed = decompressFromBase64(compressed);

    let rows = decompressed.split(';');
    let grid: GridState = rows.map(row => 
        row.split(',').map(cell => {
            let [cropId, fertilizerId, primaryCell, starredState] = cell.split(':');
            let pc = primaryCell.split('~').map(Number); // Convert to numbers immediately
            let pc2: [number, number] = [pc[0], pc[1]]; // Assert that pc2 is a tuple
            
            return {
                crop: cropId !== '0' ? getCropById(parseInt(cropId, 10)) : null,
                fertilizer: fertilizerId !== '0' ? getFertilizerById(parseInt(fertilizerId, 10)) : null,
                primaryCoord: pc2[0] !== -1 ? pc2 : null, // Check only the first element for -1
                effects: [],
                starred: starredState === '2' ? 'starred' : 'regular',
                needFertilizer: true,
            };
        })
    );

    return grid;
}

export function useGrid(): {
    grid: GridState;
    setGrid: (value: GridState) => void;
    recheckLocalStorage: () => void;
    saveGridToLocalStorage: (value: GridState) => void;
} {
    // Initialize the grid state without setting it directly to an empty grid
    const [grid, setGrid] = useState<GridState | null>(null);

    // Load the grid from localStorage only once when the component mounts
    useEffect(() => {
        const loadGridFromLocalStorage = () => {
            const storedValue = localStorage.getItem("grid");
            if (storedValue) {
                try {
                    // Attempt to detect if the stored value is serialized
                    if (isSerializedFormat(storedValue)) {
                        setGrid(deserialized(storedValue));
                    } else {
                        // Assume the stored value is in the old JSON format
                        setGrid(JSON.parse(storedValue));
                    }
                } catch (e) {
                    console.error("Failed to parse grid from localStorage:", e);
                    setGrid(createEmptyGrid());
                }
            } else {
                setGrid(createEmptyGrid());
            }
        };

        loadGridFromLocalStorage();
    }, []);

    const recheckLocalStorage = useCallback(() => {
        try {
            const storedValue = localStorage.getItem("grid");
            if (storedValue) {
                setGrid(deserialized(storedValue));
            } else {
                console.log('nothing found');
            }
        } catch (e) {
            console.error("Failed to parse grid from localStorage:", e);
        }
    }, []);

    const saveGridToLocalStorage = useCallback((value: GridState) => {
        try {
            localStorage.setItem("grid", serialized(value));
        } catch (e) {
            console.error("Failed to save grid to localStorage:", e);
        }
    }, []);

    // Helper function to check if the format is serialized
    const isSerializedFormat = (value: string) => {
        // Implement logic to detect if the string is in the serialized format
        // For example, you could check if it's base64 encoded
        try {
            atob(value);
            return true; // If atob doesn't throw, assume it's serialized
        } catch {
            return false; // If atob throws, it's likely in the old JSON format
        }
    };

    // Helper function to create an empty grid
    const createEmptyGrid = () => Array.from({ length: 9 }, () => Array.from({ length: 9 }, createEmptyCell));


    if (grid === null) {
        return {
            grid: Array.from({ length: 9 }, () =>
                Array.from({ length: 9 }, createEmptyCell)
            ),
            setGrid,
            recheckLocalStorage,
            saveGridToLocalStorage,
        };
    }

    return {
        grid,
        setGrid,
        recheckLocalStorage,
        saveGridToLocalStorage,
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
