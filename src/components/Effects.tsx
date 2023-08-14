import { GridState } from "./useGrid";

export const applyEffect: (
    grid: GridState,
    x: number,
    y: number,
    effect: string
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
            // Check if the neighbor exists (not out of bounds)
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
    effect: string
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
