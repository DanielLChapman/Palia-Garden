import React, { useCallback, useEffect, useState } from "react";
import { GridState, useGrid } from "./useGrid";
import Grid from "./Grid/Grid";
import { CropTable } from "./Grid/CropTable";
import { Crop } from "@/data/crops";
import DayContainer from "./DayCalculations/DayContainer";
import { EffectKey } from "./Grid/EffectKey";
import { Effect } from "./Effects";
import { Fertilizer } from "@/data/fertilizer";
import { FertilizerTable } from "./Grid/FertilizerTable";

export type CropCounts = Map<string, number>;

type AppProps = {
    gridCounts: CropCounts
  };
  

  const App: React.FC<AppProps> = ({ gridCounts }) => {
    
    const [currentCrop, setCurrentCrop] = useState<Crop | null>(null);
    const [currentFertilizer, setCurrentFertilizer] =
        useState<Fertilizer | null >(null);
    const [hover, setHover] = useState<Effect | null>(null);
    const [selectedEffects, setSelectedEffects] = useState<Effect[]>([]);

    const [cropCounts, setCropCounts] = useState<CropCounts>(gridCounts);
    const [displayTable, setDisplayTable] = useState<"Crops" | "Fertilizer">(
        "Crops"
    );

    useEffect(() => {
        setCropCounts(gridCounts)
    }, [gridCounts])
    
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
                            currentCrop={currentCrop}
                            setCropCounts={setCropCounts}
                            currentFertilizer={currentFertilizer}
                            displayTable={displayTable}
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

            {cropCounts.size > 0 && <DayContainer />}
        </main>
    );
}

export default App;
