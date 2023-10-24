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
import { Effect } from "./Effects";
import { SettingsProvider } from "./SettingsProvider";
import { Fertilizer } from "@/data/fertilizer";
import { FertilizerTable } from "./Grid/FertilizerTable";

export type CropCounts = Map<string, number>;

function App({}) {
    const initialState = useGrid();
    const [grid, setGrid] = useState(initialState);
    const [currentCrop, setCurrentCrop] = useState<Crop | null>(null);
    const [currentFertilizer, setCurrentFertilizer] =
        useState<Fertilizer | null>(null);
    const [hover, setHover] = useState<Effect | null>(null);
    const [selectedEffects, setSelectedEffects] = useState<Effect[]>([]);

    const [cropCounts, setCropCounts] = useState<CropCounts>(new Map());
    const [displayTable, setDisplayTable] = useState<"Crops" | "Fertilizer">(
        "Crops"
    );

    const updateGrid = (newGrid: GridState) => {
        setGrid((prevGrid) => {
            if (newGrid !== prevGrid) {
                return newGrid;
            }
            return prevGrid;
        });
    };

    return (
        <main className=" py-6 pt-0 ">
            {/* grid */}
            <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-4 justify-center">
                <div className="flex-1 p-4 justify-center flex">
                    {displayTable === "Crops" && (
                        <CropTable
                            currentCrop={currentCrop}
                            setCurrentCrop={setCurrentCrop}
                            cropCounts={cropCounts}
                            setDisplayTable={setDisplayTable}
                        />
                    )}
                    {displayTable === "Fertilizer" && (
                        <FertilizerTable
                            currentFertilizer={currentFertilizer}
                            setCurrentFertilizer={setCurrentFertilizer}
                            setDisplayTable={setDisplayTable}
                        />
                    )}
                </div>

                <div className="flex lg:hidden p-r justify-center flex-1">
                    <EffectKey
                        hover={hover}
                        setHover={setHover}
                        selectedEffects={selectedEffects}
                        setSelectedEffects={setSelectedEffects}
                    />
                </div>
                <div className="flex  p-4 justify-center  w-auto">
                    <div className="flex justify-center  h-full w-full font-montserrat">
                        <Grid
                            grid={grid}
                            setGrid={updateGrid}
                            currentCrop={currentCrop}
                            setCropCounts={setCropCounts}
                            hover={hover}
                            selectedEffects={selectedEffects}
                        />

                        <div className="hidden lg:block border-2 rounded-lg  ">
                            <EffectKey
                                hover={hover}
                                setHover={setHover}
                                selectedEffects={selectedEffects}
                                setSelectedEffects={setSelectedEffects}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {cropCounts.size > 0 && <DayContainer grid={grid} />}
        </main>
    );
}

export default App;
