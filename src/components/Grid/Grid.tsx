import React from "react";
import { GridCell, GridState } from "../useGrid";
import { GridCellComponent } from "./GridCell";
import { Crop, crops } from "@/data/crops";
import { applyEffect, checkSelfForEffects, removeEffect } from "../Effects";
import { CropCounts } from "../App";

type GridProps = {
    grid: GridState;
    setGrid: React.Dispatch<React.SetStateAction<GridState>>;
    currentCrop: Crop | null;
    setCropCounts: React.Dispatch<React.SetStateAction<CropCounts>>;
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
    currentCrop: Crop
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

    // Remove overlapping crops
    for (let i = x; i < x + currentCrop.width; i++) {
        for (let j = y; j < y + currentCrop.height; j++) {
            if (newGrid[i][j].crop !== null) {
                newGrid = removeFromGrid(newGrid, i, j);
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

const Grid: React.FC<GridProps> = ({
    grid,
    setGrid,
    currentCrop,
    setCropCounts,
}) => {
    if (!grid) return <span>Something went really wrong</span>;

    const recountGrid = (grid: GridState) => {
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

    const handleCellClick = async (x: number, y: number) => {
        //handle click
        if (currentCrop) {
            let t = addToGrid(grid, x, y, currentCrop);
            recountGrid(t);
            await setGrid(t);
        } else {
            //remove
            const newGrid = removeFromGrid(grid, x, y);
            recountGrid(newGrid);
            await setGrid(newGrid);
        }
    };
    return (
        <div className="grid-container flex justify-center items-start flex-wrap max-w-screen-lg">
            {grid.map((row, rowIndex) => (
                <div key={rowIndex} className="grid-row flex flex-wrap">
                    {row.map((cell, cellIndex) => (
                        <GridCellComponent
                            key={cellIndex}
                            cellData={cell}
                            x={rowIndex}
                            y={cellIndex}
                            onCellClick={handleCellClick}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Grid;