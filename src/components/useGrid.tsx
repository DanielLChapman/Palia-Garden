import { Crop } from "@/data/crops";
import { CellEffects } from "./Effects";

type FertilizerType = {
    name: string
}

export type GridCell = {
    crop: Crop | null;
    effects: CellEffects; // Array of effect names, e.g., ["Water Retain", "Quality Boost"]
    fertilizer: FertilizerType | null;
    primaryCoord: [number, number] | null;
};

export type GridState = GridCell[][];

export function useGrid(): GridState {
    const createEmptyCell = (): GridCell => {
        let t: GridCell = {
            crop: null,
            effects: [],
            fertilizer: null,
            primaryCoord: null,
        }

        return t;
    }
    

    const grid: GridState = Array.from({ length: 9 }, () =>
        Array.from({ length: 9 }, createEmptyCell)
    );

    return grid;
}