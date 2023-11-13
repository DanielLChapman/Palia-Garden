import React, { useEffect, useState } from "react";
import { Crop, crops } from "@/data/crops";
import { GridState } from "../useGrid";
import { countGrid } from "./GridCalculations";
import PreservationContainer, { CrafterState } from "./PreservationContainer";
import CropDisplay from "../Grid/CropDisplay";
import ProfitCalc from "./ProfitCalc";
import { useSettings } from "../useSettings";
import { fertilizers } from "@/data/fertilizer";
import { useGridContext } from "../GridContext/useGridContext";

type DayContainerProps = {
};

export type CropQualityTyping = "regular" | "starred";

export type ExpectedCropState = {
    regular: {
        count: number;
    };
    starred: {
        count: number;
    };
    regularReplants: number;
    starredReplants: number;
};

export type CropStates = {
    [cropName: string]: ExpectedCropState;
};

export const initialState: CropStates = Object.fromEntries(
    Object.keys(crops).map((x) => [
        crops[x].name,
        {
            regular: {
                count: 0,
            },
            starred: {
                count: 0,
            },
            regularReplants: 0,
            starredReplants: 0,
        },
    ])
);
export type FertilizerCountStates = {
    [fertilizerName: string]: {
        count: number
    }
}

export const initialFertilizers: FertilizerCountStates = Object.fromEntries(
    Object.keys(fertilizers).map((x) => [
        fertilizers[x].name, {
            count: 0
        }
    ])
)

const DayContainer: React.FC<DayContainerProps> = ({ }) => {
    const [amountOfDays, setAmountOfDays] = useState<number>(0);
    const [expectedCrops, setExpectedCrops] =
        useState<CropStates>(initialState);
    const [leftOverCrops, setLeftOverCrops] =
        useState<CropStates>(expectedCrops);
    const [crafters, setCrafters] = useState<CrafterState[]>([]);
    const { plantStarSeeds, overTwentyFive } = useSettings();
    const {grid} = useGridContext();

    useEffect(() => {
        const {newState: newExpectedCrops, fertilizers: fertilizerCounts} = countGrid(initialState, initialFertilizers, amountOfDays, grid, overTwentyFive);
        setExpectedCrops(newExpectedCrops);
        setLeftOverCrops(newExpectedCrops);
    }, [grid, amountOfDays]);

    return (
        <div className="flex flex-col items-center space-y-6 font-montserrat">
            {/* Day Selector */}
            <div className="flex flex-row space-x-4 items-center ">
                <span className="text-lg font-inter text-gray-2">
                    How Many Days To Simulate:
                </span>
                <input
                    type="number"
                    min="0"
                    max="100"
                    value={amountOfDays}
                    onChange={(e) => {
                        setAmountOfDays(Math.floor(parseInt(e.target.value)));
                    }}
                    className="w-20 p-2 border-2 border-gray-300 font-inter rounded focus:outline-none focus:border-indigo-500"
                />
            </div>

            <CropDisplay currentCrops={leftOverCrops} />

            <div className="flex flex-col items-center space-y-4 w-full">
                <h3 className="text-xl font-bold font-inter text-gray-2">Crafters</h3>
                <PreservationContainer
                    expectedCrops={expectedCrops}
                    leftOverCrops={leftOverCrops}
                    setLeftOverCrops={setLeftOverCrops}
                    crafters={crafters}
                    setCrafters={setCrafters}
                />
            </div>

            <div className="w-full">
                <ProfitCalc
                    days={amountOfDays}
                    leftOverCrops={leftOverCrops}
                    crafters={crafters}
                />
            </div>
        </div>
    );
};

export default DayContainer;
