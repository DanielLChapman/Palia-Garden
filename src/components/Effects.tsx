import { GridState } from "./useGrid";

export type Effect =
    | "Water Retain"
    | "Quality Boost"
    | "Grow Speed Increase"
    | "Weed Block"
    | "Increased Star Quality Chance"
    | "Increased Yield Amount";

// If you want to represent the effects as an array for a particular cell:
export type CellEffects = Effect[];

export const getNeighbors: (
    x: number,
    y: number,
    width: number,
    height: number
) => number[][] = (x, y, width = 1, height = 1) => {
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
};

const countNeighborEffects = (
    grid: GridState,
    x: number,
    y: number,
    width: number,
    height: number
): Map<Effect, number> => {
    const effects = new Map<Effect, number>();
    const cropNeighbors = getNeighbors(x, y, width, height);
    for (let [cx, cy] of cropNeighbors) {
        const currentEffect = grid[cx][cy].crop?.gardenBuff;
        if (
            grid[x][y].crop?.name !== grid[cx][cy].crop?.name &&
            currentEffect
        ) {
            effects.set(currentEffect, (effects.get(currentEffect) || 0) + 1);
        }
    }
    return effects;
};

export const checkSelfForEffects = (
    grid: GridState,
    x: number,
    y: number,
    width: number,
    height: number
): GridState => {
    const newGrid = [...grid.map((row) => [...row])];
    const currentCrop = newGrid[x][y].crop;
    const cell = newGrid[x][y];

    if (!currentCrop) {
        if (!cell.fertilizer) {
            return newGrid;
        } else {
            if (!newGrid[x ][y ].effects.includes(cell.fertilizer.gardenBuff)) {
                newGrid[x][y].effects.push(cell.fertilizer.gardenBuff);
            }
            return newGrid;
        }
    }

    const effectsCount = countNeighborEffects(newGrid, x, y, width, height);
    const requiredForBuffs = currentCrop?.requiredForBuffs || 1;

    if (cell.fertilizer) {
        let effect = cell.fertilizer.gardenBuff;
        effectsCount.set(effect, requiredForBuffs);
    }

    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            for (let [currentEffect, count] of effectsCount.entries()) {
                if (
                    count >= requiredForBuffs &&
                    !newGrid[x + i][y + j].effects.includes(currentEffect)
                ) {
                    newGrid[x + i][y + j].effects.push(currentEffect);
                }
            }
        }
    }

    return newGrid;
};

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
        if (!newGrid[nx] || !newGrid[nx][ny]) continue;
        const neighborCrop = newGrid[nx][ny].crop;
        if (!neighborCrop || neighborCrop.name === newGrid[x][y].crop?.name)
            continue;

        if (["Blueberry", "Apple", 'Spicy Pepper'].includes(neighborCrop.name)) {
            const primaryCoord = newGrid[nx][ny].primaryCoord;
            if (primaryCoord) {
                const [px, py] = primaryCoord;
                const effectsCount = countNeighborEffects(
                    newGrid,
                    px,
                    py,
                    neighborCrop.width,
                    neighborCrop.height
                );
                const requiredForBuffs = neighborCrop.requiredForBuffs || 1;
                for (let i = 0; i < neighborCrop.width; i++) {
                    for (let j = 0; j < neighborCrop.height; j++) {
                        for (let [
                            currentEffect,
                            count,
                        ] of effectsCount.entries()) {
                            if (
                                count >= requiredForBuffs &&
                                !newGrid[px + i][py + j].effects.includes(
                                    currentEffect
                                )
                            ) {
                                newGrid[px + i][py + j].effects.push(
                                    currentEffect
                                );
                            }
                        }
                    }
                }
            }
        } else if (!newGrid[nx][ny].effects.includes(effect)) {
            newGrid[nx][ny].effects.push(effect);
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

    const width = grid[x][y].crop?.width || 1;
    const height = grid[x][y].crop?.height || 1;

    const neighbors = getNeighbors(x, y, width, height);

    for (let [nx, ny] of neighbors) {
        if (newGrid[nx] && newGrid[nx][ny]) {
            const primaryCoord = newGrid[nx][ny].primaryCoord;
            if (primaryCoord) {
                const [px, py] = primaryCoord;
                const effectsCount = countNeighborEffects(
                    newGrid,
                    px,
                    py,
                    newGrid[nx][ny].crop?.width || 1,
                    newGrid[nx][ny].crop?.height || 1
                );
                const requiredForBuffs =
                    newGrid[nx][ny].crop?.requiredForBuffs || 1;

                // Check if the effect should be removed
                if ((effectsCount.get(effect) || 0) < requiredForBuffs) {
                    for (
                        let i = 0;
                        i < (newGrid[nx][ny].crop?.width || 1);
                        i++
                    ) {
                        for (
                            let j = 0;
                            j < (newGrid[nx][ny].crop?.height || 1);
                            j++
                        ) {
                            const effectIndex =
                                newGrid[px + i][py + j].effects.indexOf(effect);
                            if (effectIndex !== -1) {
                                newGrid[px + i][py + j].effects.splice(
                                    effectIndex,
                                    1
                                );
                            }
                        }
                    }
                }
            } else {
                const effectIndex = newGrid[nx][ny].effects.indexOf(effect);
                if (effectIndex !== -1) {
                    newGrid[nx][ny].effects.splice(effectIndex, 1);
                }
            }
        }
    }

    return newGrid;
};

