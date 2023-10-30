import { Crop } from "@/data/crops";
import { CellEffects } from "./Effects";
import { Fertilizer } from "@/data/fertilizer";

export type GridCell = {
    crop: Crop | null;
    effects: CellEffects; // Array of effect names, e.g., ["Water Retain", "Quality Boost"]
    fertilizer: Fertilizer | null;
    primaryCoord: [number, number] | null;
    starred?: "regular" | "starred";
    needFertilizer: boolean;
};

export type GridState = GridCell[][];

export function useGrid(): GridState {
    const createEmptyCell = (): GridCell => {
        let t: GridCell = {
            crop: null,
            effects: [],
            fertilizer: null,
            primaryCoord: null,
            starred: "regular",
            needFertilizer: true,
            //need fertilizer: if there is fertilizer, we check if there are enough neighbor effects to need to use it or not
            //if not, set it to false
        };

        return t;
    };

    const grid: GridState = Array.from({ length: 9 }, () =>
        Array.from({ length: 9 }, createEmptyCell)
    );

    return grid;
}
