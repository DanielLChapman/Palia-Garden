import { Crop } from "@/data/crops";
import { CellEffects } from "./Effects";
import { Fertilizer } from "@/data/fertilizer";

export type GridCell = {
    crop: Crop | null;
    effects: CellEffects; // Array of effect names, e.g., ["Water Retain", "Quality Boost"]
    fertilizer: Fertilizer | null;
    primaryCoord: [number, number] | null;
    starred?: "regular" | "starred";
};

export type GridState = GridCell[][];

export function useGrid(): GridState {
    const createEmptyCell = (): GridCell => {
        let t: GridCell = {
            crop: null,
            effects: ["Increased Yield Amount"],
            fertilizer: {
                name: "Harvest Boost Fertilizer",
                sources: ["Worm Farm", "Glow Worm Farm"],
                effect: "Increases the number of crop items gained when harvested",
                gardenBuff: "Increased Yield Amount",
                image: "/images/fertilizers/HarvestBoost_Fertilizer.webp",
            },
            primaryCoord: null,
            starred: "regular",
        };

        return t;
    };

    const grid: GridState = Array.from({ length: 9 }, () =>
        Array.from({ length: 9 }, createEmptyCell)
    );

    return grid;
}
