type GardenBuff = {
    description: string;
    effectOn: string[];
    percentage: number;
};

export const gardenBuffs: Record<string, GardenBuff> = {
    "Water Retain": {
        description: "Reduces the need for watering.",
        effectOn: ["wateringFrequency"],
        percentage: 1, // 50% reduction
    },
    "Weed Block": {
        description: "Prevents weed growth.",
        effectOn: ["weedGrowth"],
        percentage: 1, // 100% prevention
    },
    "Quality Boost": {
        description: "Increases the chance of star quality crops.",
        effectOn: ["cropQuality"],
        percentage: 0.5, // 50% increase in star quality chance
    },
    "Harvest Boost": {
        description: "Increases the quantity of crops harvested.",
        effectOn: ["harvestQuantity"],
        percentage: 0.5, // 50% increase in harvest quantity
    },
    "Grow Speed Increase": {
        description: "Reduces the growth time of crops.",
        effectOn: ["growthTime"],
        percentage: 0.5, // 50% reduction in growth time
    },
};

export const weedChance = .1;
export const weedPrice = 10;