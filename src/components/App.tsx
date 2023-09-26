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

export type CropCounts = Map<string, number>;

function App({}) {
    const initialState = useGrid();
    const [grid, setGrid] = useState(initialState);
    const [currentCrop, setCurrentCrop] = useState<Crop | null>(null);
    const [plantStarSeeds, setPlantStarSeeds] = useState<boolean>(false);
    const [overTwentyFive, setOverTwentyFive] = useState<boolean>(false);

    const [hover, setHover] = useState<Effect | null>(null);
    const [selectedEffects, setSelectedEffects] = useState<Effect[]>([]);

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
        <main className=" py-6 pt-0 ">
            {/* grid */}
            <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-4 justify-center">
                <div className="flex-1 p-4 justify-center flex">
                    <CropTable
                        currentCrop={currentCrop}
                        setCurrentCrop={setCurrentCrop}
                        cropCounts={cropCounts}
                        plantStarSeeds={plantStarSeeds}
                        setPlantStarSeeds={setPlantStarSeeds}
                    />
                </div>
                <div className="justify-center my-4 space-x-8 hidden">
                    <label className="flex items-center space-x-2 border-2 border-white p-2 rounded-md shadow-sm hover:bg-gray-100 transition duration-200">
                        <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-blue-600 rounded-md"
                            checked={plantStarSeeds}
                            onChange={() => setPlantStarSeeds(!plantStarSeeds)}
                        />
                        <span className="text-gray-900 font-medium">
                            Plant Star Seeds
                        </span>
                    </label>
                    <label className="flex items-center space-x-2 border-2 border-white p-2 rounded-md shadow-sm hover:bg-gray-100 transition duration-200">
                        <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-blue-600 rounded-md"
                            checked={overTwentyFive}
                            onChange={() => setOverTwentyFive(!overTwentyFive)}
                        />
                        <span className="text-gray-900 font-medium">
                            Gardening Over level 25
                        </span>
                    </label>
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
                        <div className="hidden  border-2">
                            <div className="flex flex-wrap flex-col justify-center items-center pt-2">
                                {/* Checkbox for Plant Star Seeds */}
                                <div className="flex flex-col items-center m-2">
                                    <label className="cursor-pointer w-16 h-16 border-4 rounded-full hover:scale-95 hover:bg-cadet-gray relative">
                                        <input
                                            type="checkbox"
                                            className="opacity-0 absolute"
                                            checked={plantStarSeeds}
                                            onChange={() =>
                                                setPlantStarSeeds(
                                                    !plantStarSeeds
                                                )
                                            }
                                        />
                                        <span
                                            className={`block w-full h-full rounded-full ${
                                                plantStarSeeds
                                                    ? "bg-cadet-gray"
                                                    : ""
                                            }`}
                                        ></span>
                                    </label>
                                    <span className="text-md text-center mt-2">
                                        Plant Star Seeds
                                    </span>
                                </div>

                                {/* Checkbox for Gardening Over level 25 */}
                                <div className="flex flex-col items-center m-2">
                                    <label className="cursor-pointer w-16 h-16 border-4 rounded-full hover:scale-95 hover:bg-cadet-gray relative">
                                        <input
                                            type="checkbox"
                                            className="opacity-0 absolute"
                                            checked={overTwentyFive}
                                            onChange={() =>
                                                setOverTwentyFive(
                                                    !overTwentyFive
                                                )
                                            }
                                        />
                                        <span
                                            className={`block w-full h-full rounded-full ${
                                                overTwentyFive
                                                    ? "bg-cadet-gray"
                                                    : ""
                                            }`}
                                        ></span>
                                    </label>
                                    <span className="text-md text-center mt-2">
                                        Gardening Over level 25
                                    </span>
                                </div>
                            </div>
                        </div>
                        <Grid
                            grid={grid}
                            setGrid={updateGrid}
                            currentCrop={currentCrop}
                            setCropCounts={setCropCounts}
                            hover={hover}
                            overTwentyFive={overTwentyFive}
                            plantStarSeeds={plantStarSeeds}
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

            {cropCounts.size > 0 && (
                <DayContainer grid={grid} overTwentyFive={overTwentyFive} />
            )}
        </main>
    );
}

export default App;
