import { Effect } from "@/components/Effects";
import { CropList } from "./crops";

export type Category = {
    name: string;
    description?: string;
    crops: CropList[];
    effect?: Effect;
};

export const cropCategories: Category[] = [
    {
        name: 'Fruits',
        description: 'Typically sweet or sour and consumed in a raw state.',
        crops: ['Tomato', 'Blueberry', 'Apple'/*, 'Apricot'*/]
    },
    {
        name: 'Vegetables',
        description: 'Typically consumed in both raw and cooked forms.',
        crops: ['Potato', 'Onion', 'Carrot', 'Rice', 'Spicy Pepper', 'Corn']
    },
    {
        name: 'Grains',
        description: 'Crops that are grown primarily for the edible part of their seeds.',
        crops: ['Wheat', 'Rice', 'Corn']
    },
    {
        name: 'Fibers',
        description: 'Crops grown primarily for their fibers, which can be used in crafting or manufacturing.',
        crops: ['Cotton']
    },
    {
        name: 'Reharvestable',
        description: 'Crops that can be harvested multiple times during their growth cycle.',
        crops: ['Tomato', 'Blueberry', 'Apple', 'Spicy Pepper', /*Apricot'*/]
    },
    {
        name: 'Single Harvest',
        description: 'Crops that are harvested only once and then need to be replanted.',
        crops: ['Potato', 'Onion', 'Carrot', 'Rice', 'Wheat', 'Cotton', 'Corn']
    },
    {
        name: 'Water Retain',
        effect: "Water Retain",
        crops: ['Tomato', 'Potato']
    },
    {
        name: 'Increased Yield Amount',
        effect: "Increased Yield Amount",
        crops: ['Rice', 'Wheat', 'Corn']
    },
    {
        name: 'Weed Block',
        effect: "Weed Block",
        crops: ['Carrot', 'Onion']
    },
    {
        name: 'Quality Boost',
        effect: "Quality Boost",
        crops: ['Cotton', 'Spicy Pepper']
    },
    {
        name: 'Grow Speed Increase',
        effect: "Grow Speed Increase",
        crops: ['Blueberry', 'Apple']
    },
    {
        name: 'Tree Crops',
        description: 'Crops that grow on trees and might have longer growth times.',
        crops: ['Apple'/*, 'Apricot'*/]
    },
    {
        name: 'Bush/Shrub Crops',
        description: 'Crops that grow on bushes or shrubs.',
        crops: ['Blueberry', 'Spicy Pepper']
    },
    {
        name: 'Root Crops',
        description: 'Crops where the primary edible part grows underground.',
        crops: ['Potato', 'Onion', 'Carrot']
    }
];
