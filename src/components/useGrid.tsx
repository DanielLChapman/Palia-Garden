import { Crop, crops, getCropById } from "@/data/crops";
import { CellEffects, checkSelfForEffects } from "./Effects";
import { Fertilizer, getFertilizerById } from "@/data/fertilizer";
import { useCallback, useEffect, useState } from "react";
import {
    compressToBase64,
    decompressFromBase64,
    compressToEncodedURIComponent,
    decompressFromEncodedURIComponent,
} from "lz-string";
import { CropCounts } from "./App";
import { recountGrid } from "./Grid/Grid";
import {
    isValidBase64String,
    isValidGridStructure,
} from "./tools/serializedValidation";

export type GridCell = {
    crop: Crop | null;
    effects: CellEffects;
    fertilizer: Fertilizer | null;
    primaryCoord: [number, number] | null;
    starred?: "regular" | "starred";
    needFertilizer: boolean;
};

export type GridState = GridCell[][];

export function serialized(grid: GridState): string {
    try {
        let serialized = grid
            .map((row) =>
                row
                    .map((cell) => {
                        let t = `${cell.crop ? cell.crop.id : "0"}:${
                            cell.fertilizer ? cell.fertilizer.id : "0"
                        }`;
                        t += `:${
                            cell.primaryCoord
                                ? cell.primaryCoord.join("~")
                                : "-1~-1"
                        }`;
                        t += `:${cell.starred === "starred" ? "2" : "1"}`;
                        return t;
                    })
                    .join(",")
            )
            .join(";");

        let compressed = compressToEncodedURIComponent(serialized); // Make sure you have a compress function

        let base64Encoded = btoa(compressed);

        return base64Encoded;
    } catch (error) {
        console.error("Failed to serialize grid:", error);
        return ""; // Return an empty string or handle the error as appropriate
    }
}

function deserialized(serialzied: string): GridState {
    if (!isValidBase64String(serialzied)) {
        alert("Invalid String");
        return Array.from({ length: 9 }, () =>
            Array.from({ length: 9 }, createEmptyCell)
        );
    }

    try {
        let compressed = atob(serialzied);
        let decompressed = decompressFromEncodedURIComponent(compressed);

        if (!isValidGridStructure(decompressed)) {
            alert("Invalid Decompressed Structure");
            return Array.from({ length: 9 }, () =>
                Array.from({ length: 9 }, createEmptyCell)
            );
        }

        let rows = decompressed.split(";");
        let grid: GridState = rows.map((row) =>
            row.split(",").map((cell) => {
                let [cropId, fertilizerId, primaryCell, starredState] =
                    cell.split(":");
                let pc = primaryCell.split("~").map(Number); // Convert to numbers immediately
                let pc2: [number, number] = [pc[0], pc[1]]; // Assert that pc2 is a tuple

                return {
                    crop:
                        cropId !== "0"
                            ? getCropById(parseInt(cropId, 10))
                            : null,
                    fertilizer:
                        fertilizerId !== "0"
                            ? getFertilizerById(parseInt(fertilizerId, 10))
                            : null,
                    primaryCoord: pc2[0] !== -1 ? pc2 : null, // Check only the first element for -1
                    effects: [],
                    starred: starredState === "2" ? "starred" : "regular",
                    needFertilizer: true,
                };
            })
        );

        return grid;
    } catch (error) {
        console.error("Deserialization error:", error);
        return Array.from({ length: 9 }, () =>
            Array.from({ length: 9 }, createEmptyCell)
        );
    }
}

const applyEffects = (value: GridState): GridState => {
    let newGrid = value;

    for (let i = 0; i < newGrid.length; i++) {
        for (let j = 0; j < newGrid[i].length; j++) {
            let currentCell = newGrid[i][j];
            if (currentCell.crop) {
                if (
                    currentCell.primaryCoord &&
                    currentCell.primaryCoord[0] === i &&
                    currentCell.primaryCoord[1] === j
                ) {
                    newGrid = checkSelfForEffects(
                        newGrid,
                        i,
                        j,
                        currentCell.crop?.width || 1,
                        currentCell.crop?.width || 1
                    );
                }
            } else if (currentCell.fertilizer) {
                newGrid = checkSelfForEffects(newGrid, i, j, 1, 1);
            }
        }
    }

    return newGrid;
};
interface UseGridParams {
    urlID?: string | null;
}
export function useGrid({ urlID }: UseGridParams): {
    grid: GridState;
    setGrid: (value: GridState) => void;
    recheckLocalStorage: () => void;

    saveGridToLocalStorage: (value: GridState) => void;
    gridCounts: CropCounts;
    checkString: (value: string) => void;
} {
    // Initialize the grid state without setting it directly to an empty grid
    const [grid, setGrid] = useState<GridState | null>(null);
    const [gridCounts, setGridCounts] = useState<CropCounts>(
        new Map<string, number>()
    );

    const updateGridCounts = (value: GridState) => {
        if (value) {
            let t = recountGrid(value);
            setGridCounts(recountGrid(value));
        }
    };

    const loadGridFromStringValue = (storedValue: string | null) => {
        if (storedValue) {
            try {
                // Attempt to detect if the stored value is serialized
                // NEED GRID VALIDATION
                if (isSerializedFormat(storedValue)) {
                    let t = deserialized(storedValue);

                    t = applyEffects(t);

                    setGrid(t);
                    updateGridCounts(t);
                } else {
                    // Assume the stored value is in the old JSON format
                    let t = JSON.parse(storedValue);
                    t = applyEffects(t);
                    setGrid(t);
                    updateGridCounts(t);
                }
            } catch (e) {
                console.error("Failed to parse grid from localStorage:", e);
                setGrid(createEmptyGrid());
            }
        } else {
            setGrid(createEmptyGrid());
        }
    };

    // Load the grid from url, then localStorage only once when the component mounts
    useEffect(() => {
        if (urlID) {
            if (isValidBase64String(urlID)) {
                let compressed = atob(urlID);
                let decompressed =
                    decompressFromEncodedURIComponent(compressed);

                if (decompressed !== null ) {
                    if (!isValidGridStructure(decompressed)) {
                        console.error("Invalid URL ID, Trying Local Storage Instead");
                        recheckLocalStorage();
                    } else {
                        loadGridFromStringValue(urlID);
                    }
                } else {
                    console.error("Invalid URL ID, Trying Local Storage Instead");
                    recheckLocalStorage();
                }

            } else {
                console.error("Invalid URL ID, Trying Local Storage Instead");
                recheckLocalStorage();
            }
        } else {
            recheckLocalStorage();
        }
    }, []);

    const checkString = useCallback((value: string) => {
        if (!value) {
            alert("Invalid String");
        }

        loadGridFromStringValue(value);
    }, []);

    const recheckLocalStorage = useCallback(() => {
        try {
            const storedValue = localStorage.getItem("grid");
            loadGridFromStringValue(storedValue);
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
    const createEmptyGrid = () =>
        Array.from({ length: 9 }, () =>
            Array.from({ length: 9 }, createEmptyCell)
        );

    if (grid === null) {
        return {
            grid: Array.from({ length: 9 }, () =>
                Array.from({ length: 9 }, createEmptyCell)
            ),
            setGrid,
            recheckLocalStorage,
            saveGridToLocalStorage,
            gridCounts,
            checkString,
        };
    }

    return {
        grid,
        setGrid,
        recheckLocalStorage,
        saveGridToLocalStorage,
        gridCounts,
        checkString,
    };
}

export function createEmptyCell(): GridCell {
    return {
        crop: null,
        effects: [],
        fertilizer: null,
        primaryCoord: null,
        starred: "regular",
        needFertilizer: true,
    };
}
