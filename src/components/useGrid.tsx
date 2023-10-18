import { Crop } from "@/data/crops";
import { CellEffects } from "./Effects";
import { Fertilizer } from "@/data/fertilizer";

export type GridCell = {
    crop: Crop | null;
    effects: CellEffects; // Array of effect names, e.g., ["Water Retain", "Quality Boost"]
    fertilizer: Fertilizer | null
    primaryCoord: [number, number] | null;
    starred?: 'regular' | 'starred'
};

export type GridState = GridCell[][];

export function useGrid(): GridState {
    const createEmptyCell = (): GridCell => {
        let t: GridCell = {
            crop: null,
            effects: [],
            fertilizer: null,
            primaryCoord: null,
            starred: 'regular'
        }

        return t;
    }
    

    const grid: GridState = Array.from({ length: 9 }, () =>
        Array.from({ length: 9 }, createEmptyCell)
    );

    return grid;
}
