import { Crop } from "@/data/crops";

type GridCell = {
    crop: Crop | null;
    effects: string[]; // Array of effect names, e.g., ["Water Retain", "Quality Boost"]
    //fertilizer: FertilizerType | null;
};

type GridState = GridCell[][];

export function useGrid(): GridState {
    const createEmptyCell = (): GridCell => ({
        crop: null,
        effects: [],
    });

    const grid: GridState = Array.from({ length: 9 }, () =>
        Array.from({ length: 9 }, createEmptyCell)
    );

    return grid;
}
