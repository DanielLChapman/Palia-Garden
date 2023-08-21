import React, { useEffect, useState } from "react";
import { Crop, crops } from "@/data/crops";
import { GridState } from "../useGrid";
import { countGrid } from "./GridCalculations";
import PreservationContainer, { CrafterState } from "./PreservationContainer";
import CropDisplay from "../Grid/CropDisplay";

type DayContainerProps = {
    grid: GridState
};

export type CropQualityTyping = 'regular' | 'starred' ;

export type ExpectedCropState = {
    regular: {
        count: number;
    };
    starred: {
        count: number;
    };
    replants: number;
};

export type CropStates = {
    [cropName: string]: ExpectedCropState;
};

export const initialState: CropStates = Object.fromEntries(
    Object.keys(crops).map((x) => [
        crops[x].name,
        {
            regular: {
                count: 0
            },
            starred: {
                count: 0
            },
            replants: 0
        }
    ])
);

const DayContainer: React.FC<DayContainerProps> = ({ grid }) => {
    const [amountOfDays, setAmountOfDays] = useState<number>(0);
    const [expectedCrops, setExpectedCrops] = useState<CropStates>(initialState);
    const [leftOverCrops, setLeftOverCrops] = useState<CropStates>(expectedCrops);
    const [crafters, setCrafters] = useState<CrafterState[]>([]);

    useEffect(() => {
        const newExpectedCrops = countGrid(initialState, amountOfDays, grid);
        setExpectedCrops(newExpectedCrops);
        setLeftOverCrops(newExpectedCrops)
    }, [grid, amountOfDays]);
    

    

    return (
        <div className="justify-center flex flex-col">
            {/* Day Selector */}
            <div className="flex flex-row justify-center">
                <span>How Many Days To Simulate:</span>
                <input
                    type="number"
                    min="0"
                    max="100"
                    value={amountOfDays}
                    onChange={(e) => {
                        setAmountOfDays(Math.floor(parseInt(e.target.value)));
                    }}
                />
            </div>

            <CropDisplay currentCrops={leftOverCrops}/>

            <div className="flex flex-col justify-center">
                <h3 className="flex flex-row justify-center">Crafters</h3>
                <PreservationContainer expectedCrops={expectedCrops} leftOverCrops={leftOverCrops} setLeftOverCrops={setLeftOverCrops} crafters={crafters} setCrafters={setCrafters} />
            </div>
        </div>
    );
};

export default DayContainer;
