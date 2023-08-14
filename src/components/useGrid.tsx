import { Crop } from "@/data/crops";
import { CellEffects } from "./Effects";

type FertilizerType = {
    name: string
}

export type GridCell = {
    crop: Crop | null;
    effects: CellEffects; // Array of effect names, e.g., ["Water Retain", "Quality Boost"]
    fertilizer: FertilizerType | null;
};

export type GridState = GridCell[][];

export function useGrid(): GridState {
    const createEmptyCell = (): GridCell => {
        let t: GridCell = {
            crop: null,
            effects: [],
            fertilizer: null,
        }
    
        const randomNum = Math.floor(Math.random() * 6) + 1;
    
        if (randomNum === 1) {
            t.effects.push('Water Retain');
        }
        if (randomNum === 2) {
            t.effects.push('Water Retain');
            t.effects.push('Quality Boost');
        }
        if (randomNum === 3) {
            t.effects.push('Water Retain');
            t.effects.push('Quality Boost');
            t.effects.push("Increased Yield Amount")
        }
        
        return t;
    }
    

    const grid: GridState = Array.from({ length: 9 }, () =>
        Array.from({ length: 9 }, createEmptyCell)
    );

    console.log(grid)

    return grid;
}
