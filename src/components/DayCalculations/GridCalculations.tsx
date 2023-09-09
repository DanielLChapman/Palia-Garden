import { Crop } from "@/data/crops";
import { GridState } from "../useGrid";
import { CropStates, ExpectedCropState } from "./DayContainer";
import { CellEffects } from "../Effects";

const getHarvestOutput = (
    crop: Crop,
    effects: CellEffects,
    starred: string = "regular",
    overTwentyFive: boolean = false
) => {

    //muddled data, need to double check this
    const harvestAmountBase = crop?.harvestQuantity[0];
    let harvestAmount = harvestAmountBase;

    const hasQualityBoost = effects.includes("Quality Boost");
    const hasHarvestBoost = effects.includes("Increased Yield Amount");

    // Handle Harvest Boost
    if (hasHarvestBoost) {
        harvestAmount += Math.floor(harvestAmount * 0.5);
    }

    // Calculate amount for starred quality
    const getStarredAmount = (amount: number) => {
        if (amount <= 2) return 1;
        return Math.floor(Math.random() * amount);
    };

    if (overTwentyFive) {
        return Math.random() < 0.95
            ? { regular: 0, starred: harvestAmount }
            : {
                  regular: 1,
                  starred: harvestAmount - 1,
              };
    }

    if (starred === "regular") {
        if (hasQualityBoost) {
            return Math.random() < 0.2
                ? { regular: harvestAmount, starred: 0 }
                : {
                      regular: harvestAmount - getStarredAmount(harvestAmount),
                      starred: getStarredAmount(harvestAmount),
                  };
        } else {
            return Math.random() < 0.5
                ? { regular: harvestAmount, starred: 0 }
                : {
                      regular: harvestAmount - getStarredAmount(harvestAmount),
                      starred: getStarredAmount(harvestAmount),
                  };
        }
    } else if (starred === "starred") {
        if (hasQualityBoost) {
            const rand = Math.random();
            if (rand < 0.01) {
                return { regular: harvestAmount, starred: 0 };
            } else if (rand < 0.155) {
                return {
                    regular: getStarredAmount(harvestAmount),
                    starred: harvestAmount - getStarredAmount(harvestAmount),
                };
            } else {
                return { regular: 0, starred: harvestAmount };
            }
        } else {
            const rand = Math.random();
            if (rand < 0.16) {
                return { regular: harvestAmount, starred: 0 };
            } else if (rand < 0.63) {
                return {
                    regular: getStarredAmount(harvestAmount),
                    starred: harvestAmount - getStarredAmount(harvestAmount),
                };
            } else {
                return { regular: 0, starred: harvestAmount };
            }
        }
    }
};

const getHarvestSpeed = (crop: Crop, effects: CellEffects) => {
    return effects.includes("Grow Speed Increase") && Math.random() < 0.1
        ? crop.growthTime - 1
        : crop.growthTime;
};

const calculateHarvests = (
    totalDays: number,
    initialGrowthTime: number,
    reharvest: boolean = false,
    numReharvest: number = 4,
    reharvestTime: number = 4
) => {
    if (!reharvest) {
        return {
            totalHarvests: Math.floor(totalDays / initialGrowthTime),
            replants: Math.floor(totalDays / initialGrowthTime) + 1,
        };
    }

    let harvests = 0;
    let replants = 1;
    let reharvests = 0;

    while (totalDays >= initialGrowthTime) {
        harvests++;
        totalDays -= initialGrowthTime;

        while (reharvests < numReharvest && totalDays >= reharvestTime) {
            harvests++;
            totalDays -= reharvestTime;
            reharvests++;
        }

        if (reharvests === numReharvest && totalDays >= initialGrowthTime) {
            replants++;
            reharvests = 0;
        }
    }

    return {
        totalHarvests: harvests,
        replants,
    };
};

export function countGrid(
    initialState: CropStates,
    days: number,
    grid: GridState,
    overTwentyFive: boolean,
): CropStates {
    if (!grid) return initialState;
    let newState = JSON.parse(JSON.stringify(initialState));

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            const cell = grid[i][j];
            if (!cell) continue;

            const { crop, effects, primaryCoord } = cell;
            if (!crop) continue;
            if (!primaryCoord) continue;
            if (primaryCoord[0] !== i || primaryCoord[1] !== j) continue;

            if (!newState[crop.name]) {
                newState[crop.name] = {
                    regular: {
                        count: 0,
                    },
                    starred: {
                        count: 0,
                    },
                    regularReplants: 0,
                    starredReplants: 0,
                };
            }

            const harvestSpeed = getHarvestSpeed(crop, effects);
            const { totalHarvests: numberOfHarvests, replants } =
                calculateHarvests(
                    days,
                    harvestSpeed,
                    crop.reharvestable,
                    4,
                    crop.reharvestTime
                );
            for (let i = 0; i < numberOfHarvests; i++) {
                const harvestOutput = getHarvestOutput(
                    crop,
                    effects,
                    cell.starred,
                    overTwentyFive,
                );
                newState[crop.name].regular.count += harvestOutput?.regular || 0;
                newState[crop.name].starred.count += harvestOutput?.starred || 0;
            }
            cell.starred === "starred"
                ? (newState[crop.name].starredReplants += replants)
                : (newState[crop.name].regularReplants += replants);
        }
    }

    return newState;
}
