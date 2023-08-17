import React, { useState } from "react";
import { Crop, crops } from "@/data/crops";
import { GridState } from "../useGrid";
import { countGrid } from "./GridCalculations";

type DayContainerProps = {
    cropCounts: Map<string, number>;
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

const initialState: CropStates = Object.fromEntries(
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

const DayContainer: React.FC<DayContainerProps> = ({ cropCounts, grid }) => {
    const [amountOfDays, setAmountOfDays] = useState<number>(0);
    const [expectedCrops, setExpectedCrops] = useState<CropStates>(initialState);

    if (!cropCounts || cropCounts.size === 0) {
        return null;
    }
    
    countGrid(expectedCrops, amountOfDays, grid)

    return (
        <div className="justify-center flex">
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
        </div>
    );
};

export default DayContainer;
