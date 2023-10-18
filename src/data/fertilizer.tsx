import { Effect } from "@/components/Effects";

// fertilizers.tsx
export type Fertilizer = {
    name: string;
    sources: string[];
    recipeSource?: string;
    cost?: number;
    effect: string;
    image: string;
    gardenBuff: Effect
};

export type FertilizerTyping = {
    [fertilizerName: string]: Fertilizer,
}

export const fertilizers: FertilizerTyping = {
    QualityUpFertilizer: {
        name: "Quality Up Fertilizer",
        sources: ["Worm Farm", "Badruu's Guild Store"],
        effect: "Increases quality of crops harvested",
        gardenBuff: "Quality Boost",
        image: '/images/fertilizers/QualityUp_Fertilizer.webp', 
    },
    HarvestBoostFertilizer: {
        name: "Harvest Boost Fertilizer",
        sources: ["Worm Farm", "Glow Worm Farm"],
        effect: "Increases the number of crop items gained when harvested",
        gardenBuff: "Increased Yield Amount",
        image: '/images/fertilizers/HarvestBoost_Fertilizer.webp',
    },
    SpeedyGroFertilizer: {
        name: "Speedy Gro Fertilizer",
        sources: ["Glow Worm Farm", "Badruu's Guild Store"],
        effect: "Doubles the growth rate for crops",
        gardenBuff: "Grow Speed Increase",
        image: '/images/fertilizers/SpeedyGro_Fertilizer.webp', 
    },
    WeedBlockFertilizer: {
        name: "Weed Block Fertilizer",
        sources: ["General Store"],
        cost: 2, // Cost per unit
        effect: "Stops weeds from appearing",
        gardenBuff: "Weed Block",
        image: '/images/fertilizers/WeedBlock_Fertilizer.webp',
    },
    HydrateProFertilizer: {
        name: "Hydrate Pro Fertilizer",
        sources: ["General Store"],
        cost: 2, // Cost per unit
        gardenBuff: "Water Retain",
        effect: "Prevents crops from needing water for one day",
        image: '/images/fertilizers/HydratePro_Fertilizer.webp', 
    },
};

export type FertilizerList = 'QualityUpFertilizer' | 'HarvestBoostFertilizer' | 'SpeedyGroFertilizer' | 'WeedBlockFertilizer' | 'HydrateProFertilizer';
