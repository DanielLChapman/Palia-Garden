import React, { useCallback, useState } from "react";
import { GridState, useGrid } from "./useGrid";
import Header from "./Header";
import Footer from "./Footer";
import Grid from "./Grid/Grid";
import { CropTable } from "./Grid/CropTable";
import { Crop } from "@/data/crops";
import CropDisplay from "./Grid/CropDisplay";
import DayContainer from "./DayCalculations/DayContainer";
import { EffectKey } from "./Grid/EffectKey";

export type CropCounts = Map<string, number>;

function App({}) {
    const initialState = useGrid();
    const [grid, setGrid] = useState(initialState);
    const [currentCrop, setCurrentCrop] = useState<Crop | null>(null);
    const [cropCounts, setCropCounts] = useState<CropCounts>(new Map());

    const updateGrid = (newGrid: GridState) => {
        setGrid((prevGrid) => {
            if (newGrid !== prevGrid) {
                return newGrid;
            }
            return prevGrid;
        });
    };

    return (
        <main className=" py-6 px-4 pt-0 ">
            {/* grid */}
            <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-4 justify-center">
                <div className="flex-1 p-4 justify-center flex">
                    <CropTable
                        currentCrop={currentCrop}
                        setCurrentCrop={setCurrentCrop}
                        cropCounts={cropCounts}
                    />
                </div>
                <div className="flex p-4 justify-center flex-1 ">
                    <EffectKey />
                </div>
                <div className="flex-1  p-4 justify-center flex w-auto">
                    <Grid
                        grid={grid}
                        setGrid={updateGrid}
                        currentCrop={currentCrop}
                        setCropCounts={setCropCounts}
                    />
                </div>
            </div>

            {cropCounts.size > 0 && <DayContainer grid={grid} />}
        </main>
    );
}

export default App;
