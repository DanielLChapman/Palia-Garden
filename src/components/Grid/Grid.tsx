import React, { useCallback } from "react";
import { GridCell, GridState } from "../useGrid";
import { GridCellComponent } from "./GridCell";
import { Crop, crops } from "@/data/crops";
import {
    Effect,
    applyEffect,
    checkSelfForEffects,
    removeEffect,
} from "../Effects";
import { CropCounts } from "../App";
import { EffectKey } from "./EffectKey";
import { useSettings } from "../useSettings";
import { Fertilizer } from "@/data/fertilizer";

type GridProps = {
    grid: GridState;
    setGrid: (newGrid: GridState) => void;
    currentCrop: Crop | null;
    setCropCounts: React.Dispatch<React.SetStateAction<CropCounts>>;
    hover: Effect | null;
    selectedEffects: Effect[];
};

export const removeFromGrid = (
    grid: GridState,
    x: number,
    y: number
): GridState => {
    const newGrid = [...grid.map((row) => [...row])];
    const currentCrop = newGrid[x][y].crop;

    if (!currentCrop) return newGrid;

    const [px, py] = newGrid[x][y].primaryCoord || [x, y];

    for (let i = 0; i < currentCrop.width; i++) {
        for (let j = 0; j < currentCrop.height; j++) {
            newGrid[px + i][py + j] = {
                crop: null,
                effects: [],
                fertilizer: null,
                primaryCoord: null,
            };
            removeEffect(newGrid, px + i, py + j, currentCrop.gardenBuff);
        }
    }

    return newGrid;
};

export const addToGrid = (
    grid: GridState,
    x: number,
    y: number,
    currentCrop: Crop,
    plantStarSeeds: boolean
): GridState => {
    let newGrid = [...grid.map((row) => [...row])];

    if (!currentCrop) return newGrid;

    if (
        x + currentCrop.width > grid.length ||
        y + currentCrop.height > grid[0].length
    ) {
        console.error("Crop doesn't fit at the specified position");
        return newGrid;
    }

    let fertilizerCount = new Map();

    // Remove overlapping crops
    for (let i = x; i < x + currentCrop.width; i++) {
        for (let j = y; j < y + currentCrop.height; j++) {
            if (newGrid[i][j].crop !== null) {
                newGrid = removeFromGrid(newGrid, i, j);
            }
            if (newGrid[i][j].fertilizer) {
                fertilizerCount.set(newGrid[i][j].fertilizer?.gardenBuff, (fertilizerCount.get(newGrid[i][j].fertilizer?.gardenBuff) || 0) + 1);
            }
        }
    }

    let needFertilizer = currentCrop.width * currentCrop.height;
    if (fertilizerCount.size > 1 || (fertilizerCount.size === 1 && needFertilizer !== fertilizerCount.values().next().value )) {
        for (let i = x; i < x + currentCrop.width; i++) {
            for (let j = y; j < y + currentCrop.height; j++) {
                if (newGrid[i][j].fertilizer) {
                    newGrid = removeFertilizerFromGrid(newGrid, i, j);
                }
            }
        }
    
    }

    // Place the new crop
    for (let i = 0; i < currentCrop.width; i++) {
        for (let j = 0; j < currentCrop.height; j++) {
            newGrid[x + i][y + j] = {
                crop: currentCrop,
                effects: [],
                fertilizer: null,
                primaryCoord: [x, y],
                starred: plantStarSeeds ? "starred" : "regular",
            };
        }
    }
    // Check the crop itself for effects from its neighbors
    newGrid = checkSelfForEffects(
        newGrid,
        x,
        y,
        currentCrop.width,
        currentCrop.height
    );

    // Apply the effect of the new crop
    newGrid = applyEffect(
        newGrid,
        x,
        y,
        currentCrop.gardenBuff,
        currentCrop.width,
        currentCrop.height
    );

    return newGrid;
};

const extractThreeByThree = (
    grid: GridState,
    startX: number,
    startY: number
): GridCell[][] => {
    const section: GridCell[][] = [];
    for (let i = 0; i < 3; i++) {
        const row: GridCell[] = [];
        for (let j = 0; j < 3; j++) {
            row.push(grid[startX + i][startY + j]);
        }
        section.push(row);
    }
    return section;
};

const renderThreeByThree = (
    grid: GridState,
    startX: number,
    startY: number,
    handleCellClick: (x: number, y: number) => void,
    hover: Effect | null,
    selectedEffects: Effect[],
    currentCrop: Crop | null
) => {
    const section = extractThreeByThree(grid, startX, startY);
    return (
        <div
            key={`${startX}-${startY}`}
            className="three-by-three border-2 m-0.5 p-0.5"
        >
            {section.map((row, rowIndex) => (
                <div key={rowIndex} className="grid-row flex flex-wrap">
                    {row.map((cell, cellIndex) => (
                        <GridCellComponent
                            key={cellIndex}
                            cellData={cell}
                            x={startX + rowIndex}
                            y={startY + cellIndex}
                            onCellClick={handleCellClick}
                            hover={hover}
                            selectedEffects={selectedEffects}
                            currentCrop={currentCrop}
                            fertilizer={cell.fertilizer || undefined}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

//FERTILIZER

export const addFertilizerToGrid = (
    grid: GridState,
    x: number,
    y: number,
    currentFertilizer: Fertilizer,
): GridState => {
    // Create a new grid from the current state to avoid direct mutation.
    let newGrid = [...grid.map(row => [...row])];

    // If there's no fertilizer selected, return the grid as is.
    if (!currentFertilizer) return newGrid;

    // Retrieve the current cell and crop.
    let currentCell = newGrid[x][y];
    let currentCrop = currentCell.crop;

    // If there's no crop in the selected cell, return the grid as i
    if (!currentCrop) {
        newGrid[x][y].fertilizer = currentFertilizer;
        newGrid = checkSelfForEffects(
            newGrid,
            x,
            y,
            1,
            1
        );
        return newGrid;
    }

    // Determine the primary coordinates for the crop.
    const [px, py] = currentCell.primaryCoord || [x, y];

    // Apply the fertilizer to all cells occupied by the crop.
    for (let i = 0; i < currentCrop.width; i++) {
        for (let j = 0; j < currentCrop.height; j++) {
            // Set the fertilizer for each cell.
            newGrid[px + i][py + j].fertilizer = currentFertilizer;
        }
    }

    newGrid = checkSelfForEffects(
        newGrid,
        x,
        y,
        currentCrop.width,
        currentCrop.height
    );

    // Return the updated grid.
    return newGrid;
};


export const removeFertilizerFromGrid = (
    grid: GridState,
    x: number,
    y: number,
): GridState => {
    let newGrid = [...grid.map((row) => [...row])];

    //check if there is a current crop
    let currentCell = grid[x][y];

    //if no, just set it to null
    if (!currentCell.crop || (currentCell.crop.width === 1 && currentCell.crop.height === 1)) {
        if (currentCell.fertilizer) {
            newGrid = removeEffect(newGrid, x,y, currentCell.fertilizer?.gardenBuff);
        }
        newGrid[x][y].fertilizer = null;
    }

    //else
    const [px, py] = newGrid[x][y].primaryCoord || [x, y];
    for (let i = 0; i < (currentCell.crop?.width || 1); i++) {
        for (let j = 0; j < (currentCell.crop?.height || 1); j++) {
            newGrid[px + i][py + j].fertilizer = null;
            if (currentCell.fertilizer) {
                newGrid = removeEffect(newGrid, px + i, py + j, currentCell.fertilizer?.gardenBuff);
            }
        }
    }

    return newGrid;
}


const Grid: React.FC<GridProps> = ({
    grid,
    setGrid,
    currentCrop,
    setCropCounts,
    hover,
    selectedEffects,
}) => {
    const { plantStarSeeds, overTwentyFive } = useSettings();
    
    const outputGridL = () => {
        let results = [];
        for (let i = 0; i < grid.length; i++) {
            let t = [];
            for (let j = 0; j < grid[0].length; j++) {
                t.push(grid[i][j].crop?.name || " ");
            }
            results.push(t);
        }
    };

    const recountGrid = (grid: GridState) => {
        if (!grid) {
            alert("Something went really wrong!");
            return;
        }
        const newCropCounts = new Map<string, number>();

        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                let cell = grid[i][j];

                if (cell.crop && cell.primaryCoord) {
                    if (
                        cell.primaryCoord[0] === i &&
                        cell.primaryCoord[1] === j
                    ) {
                        const cropName = cell.crop.name;
                        newCropCounts.set(
                            cropName,
                            (newCropCounts.get(cropName) || 0) + 1
                        );
                    }
                }
            }
        }

        setCropCounts(newCropCounts);
    };

    const handleCellClick = useCallback(
        async (x: number, y: number) => {
            if (!grid) {
                return;
            }
            //handle click
            if (currentCrop) {
                let t = addToGrid(grid, x, y, currentCrop, plantStarSeeds);
                recountGrid(t);
                setGrid(t);
            } else {
                //remove
                const newGrid = removeFromGrid(grid, x, y);
                recountGrid(newGrid);
                setGrid(newGrid);
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [grid, currentCrop, plantStarSeeds]
    );

    return (
        <div className="overflow-x-auto max-w-screen-lg px-0 lg:px-10">
            <div className="grid-container flex justify-center items-start flex-wrap w-[700px] border-2 border-gray-100 rounded-lg">
                {Array.from({ length: 3 }).map((_, i) =>
                    Array.from({ length: 3 }).map((_, j) =>
                        renderThreeByThree(
                            grid,
                            i * 3,
                            j * 3,
                            handleCellClick,
                            hover,
                            selectedEffects,
                            currentCrop,
                        )
                    )
                )}
            </div>
        </div>
    );
};

export default Grid;
