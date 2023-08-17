import { Crop } from "@/data/crops";
import { GridState } from "../useGrid";
import { ExpectedCropState } from "./DayContainer";

const getHarvestOutput = (crop: Crop) => {
    const harvestAmountBase = crop?.harvestQuantity[Math.floor(Math.random() * crop.harvestQuantity.length)] || 2;
    let harvestAmount = harvestAmountBase;

    const hasQualityBoost = crop?.gardenBuff['Quality Boost'];
    const hasHarvestBoost = crop?.gardenBuff['Harvest Boost'];

    // Handle Harvest Boost
    if (hasHarvestBoost && Math.random() < 0.75) {
        harvestAmount += crop.width;
    }

    // Calculate amount for starred quality
    const getStarredAmount = (amount: number) => {
        if (amount <= 2) return 1;
        return Math.floor(Math.random() * amount);
    };

    // Base case without properties
    if (!crop?.gardenBuff) {
        const amount = getStarredAmount(harvestAmount);
        return Math.random() < 0.5 
            ? { regular: harvestAmount, starred: 0 }
            : { regular: harvestAmount - amount, starred: amount };
    }

    // Determine the probability for starred quality based on Quality Boost
    const qualityBoostProbability = hasQualityBoost ? 0.8 : 0.5;

    // Calculate the harvest output
    const amount = getStarredAmount(harvestAmount);
    return Math.random() < qualityBoostProbability 
        ? { regular: harvestAmount - amount, starred: amount }
        : { regular: harvestAmount, starred: 0 };
}

const getHarvestSpeed = (crop: Crop) => {
    return crop.gardenBuff['Grow Speed Increase'] && Math.random() < 0.1 
        ? crop.growthTime - 1
        : crop.growthTime;
}

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
            replants: Math.floor(totalDays / initialGrowthTime) + 1
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

        if (reharvests === numReharvest) {
            replants++;
            reharvests = 0;
        }
    }

    return {
        totalHarvests: harvests,
        replants
    };
}

export function countGrid(initialState: ExpectedCropState[], days: number, grid: GridState):ExpectedCropState[]  {
    if (!grid) return initialState;
    let newState = {...initialState};
    let newGrid = [...grid.map((row) => [{
    }])];
    const newSeeds = {};

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            const cell = grid[i][j];
            if (!cell) continue;
    
            const { crop, primaryCoord } = cell;
            if (!crop) continue;
            if (!primaryCoord) continue;
            if (primaryCoord[0] !== i || primaryCoord[1] !== j) continue;
    
            const harvestOutput = getHarvestOutput(crop);
            const harvestSpeed = getHarvestSpeed(crop);
            const harvests = calculateHarvests(days, crop.growthTime, crop.reharvestable, 4, crop.reharvestTime );

            console.log(harvests);
    
 
        }
    }  



    return newState;
}