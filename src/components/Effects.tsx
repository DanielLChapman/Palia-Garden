import { GridState } from "./useGrid";

type Effect = 
  | "Water Retain"
  | "Quality Boost"
  | "Grow Speed Increase"
  | "Weed Block"
  | "Increased Star Quality Chance"
  | "Increased Yield Amount";

// If you want to represent the effects as an array for a particular cell:
export type CellEffects = Effect[];


export const getNeighbors: (x:number, y: number, width: number, height: number) => number[][] = (x, y, width = 1, height = 1) => {
    const neighbors = [];
    
    // Left neighbors
    if (x > 0) {
        for (let j = y; j < y + height; j++) {
            neighbors.push([x - 1, j]);
        }
    }
    
    // Right neighbors
    if (x + width < 9) {
        for (let j = y; j < y + height; j++) {
            neighbors.push([x + width, j]);
        }
    }
    
    // Top neighbors
    if (y > 0) {
        for (let i = x; i < x + width; i++) {
            neighbors.push([i, y - 1]);
        }
    }
    
    // Bottom neighbors
    if (y + height < 9) {
        for (let i = x; i < x + width; i++) {
            neighbors.push([i, y + height]);
        }
    }

    return neighbors;
}


export const applyEffect: (
    grid: GridState,
    x: number,
    y: number,
    effect: Effect,
    width: number,
    height: number
) => GridState = (grid, x, y, effect, width = 1, height = 1) => {
    const newGrid = [...grid.map((row) => [...row])];

    const neighbors = getNeighbors(x, y, width, height);

    for (let [nx, ny] of neighbors) {
        if (newGrid[nx] && newGrid[nx][ny]) {
            if (!newGrid[nx][ny].effects.includes(effect)) {
                newGrid[nx][ny].effects.push(effect);
            }
        }
    }

    return newGrid;
};


export const removeEffect: (
    grid: GridState,
    x: number,
    y: number,
    effect: Effect
) => GridState = (grid, x, y, effect) => {

    const newGrid = [...grid.map((row) => [...row])];

    const neighbors = [
        [x + 1, y],
        [x - 1, y],
        [x, y + 1],
        [x, y - 1],
    ];

    for (let [nx, ny] of neighbors) {
        if (newGrid[nx] && newGrid[nx][ny]) {
            let shouldRemove = true;
            for (let [mx, my] of neighbors) {
                if (mx !== x || my !== y) { // Exclude the current item
                    if (newGrid[mx] && newGrid[mx][my] && newGrid[mx][my].effects && newGrid[mx][my].effects.includes(effect)) {
                        shouldRemove = false;
                        break;
                    }
                }
            }
            if (shouldRemove) {
                const effectIndex = newGrid[nx][ny].effects.indexOf(effect);
                if (effectIndex !== -1) {
                    grid[nx][ny].effects.splice(effectIndex, 1);
                }
            }
        }
    }

    return newGrid;

}
