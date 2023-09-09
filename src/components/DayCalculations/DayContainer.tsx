import React, { useEffect, useState } from "react";
import { Crop, crops } from "@/data/crops";
import { GridState } from "../useGrid";
import { countGrid } from "./GridCalculations";
import PreservationContainer, { CrafterState } from "./PreservationContainer";
import CropDisplay from "../Grid/CropDisplay";
import ProfitCalc from "./ProfitCalc";

type DayContainerProps = {
    grid: GridState;
    overTwentyFive: boolean,
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

const DayContainer: React.FC<DayContainerProps> = ({ grid, overTwentyFive }) => {
    const [amountOfDays, setAmountOfDays] = useState<number>(0);
    const [expectedCrops, setExpectedCrops] =
        useState<CropStates>(initialState);
    const [leftOverCrops, setLeftOverCrops] =
        useState<CropStates>(expectedCrops);
    const [crafters, setCrafters] = useState<CrafterState[]>([]);

    useEffect(() => {
        const newExpectedCrops = countGrid(initialState, amountOfDays, grid, overTwentyFive);
        setExpectedCrops(newExpectedCrops);
        setLeftOverCrops(newExpectedCrops);
    }, [grid, amountOfDays]);

    return (
        <div className="flex flex-col items-center space-y-6 font-pt-serif">
            {/* Day Selector */}
            <div className="flex flex-row space-x-4 items-center">
                <span className="text-lg font-semibold">
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
                    className="w-20 p-2 border-2 border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                />
            </div>

            <CropDisplay currentCrops={leftOverCrops} />

            <div className="flex flex-col items-center space-y-4 w-full">
                <h3 className="text-xl font-bold">Crafters</h3>
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
