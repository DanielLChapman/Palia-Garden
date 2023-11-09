import { Effect } from "@/components/Effects";

// fertilizers.tsx
export type Fertilizer = {
    id: number;
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
        id: 1,
        name: "Quality Up Fertilizer",
        sources: ["Worm Farm", "Badruu's Guild Store"],
        effect: "Increases quality of crops harvested",
        gardenBuff: "Quality Boost",
        image: '/images/fertilizers/QualityUp_Fertilizer.webp', 
    },
    HarvestBoostFertilizer: {
        id: 2,
        name: "Harvest Boost Fertilizer",
        sources: ["Worm Farm", "Glow Worm Farm"],
        effect: "Increases the number of crop items gained when harvested",
        gardenBuff: "Increased Yield Amount",
        image: '/images/fertilizers/HarvestBoost_Fertilizer.webp',
    },
    SpeedyGroFertilizer: {
        id: 3,
        name: "Speedy Gro Fertilizer",
        sources: ["Glow Worm Farm", "Badruu's Guild Store"],
        effect: "Doubles the growth rate for crops",
        gardenBuff: "Grow Speed Increase",
        image: '/images/fertilizers/SpeedyGro_Fertilizer.webp', 
    },
    WeedBlockFertilizer: {
        id:4, 
        name: "Weed Block Fertilizer",
        sources: ["General Store"],
        cost: 2, // Cost per unit
        effect: "Stops weeds from appearing",
        gardenBuff: "Weed Block",
        image: '/images/fertilizers/WeedBlock_Fertilizer.png',
    },
    HydrateProFertilizer: {
        id: 5,
        name: "Hydrate Pro Fertilizer",
        sources: ["General Store"],
        cost: 2, // Cost per unit
        gardenBuff: "Water Retain",
        effect: "Prevents crops from needing water for one day",
        image: '/images/fertilizers/HydratePro_Fertilizer.webp', 
    },
};

export function getFertilizerById(id: number) {
    // Get all the values from the object
  const items = Object.values(fertilizers);

  // Find the item with the given id
  const item = items.find(item => item.id === id);

  // If the item is found, return it
  if (item) {
    return item;
  }

  // If the item is not found, return null
  return null;
}

export type FertilizerList = 'QualityUpFertilizer' | 'HarvestBoostFertilizer' | 'SpeedyGroFertilizer' | 'WeedBlockFertilizer' | 'HydrateProFertilizer';
