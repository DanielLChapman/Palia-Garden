import { Effect } from "@/components/Effects";

// crops.js
export type SeedGeneration = {
    inputQuantity: number;
    outputQuantity: number;
    time: number;
};

export type Crop = {
    name: string;
    growthTime: number;
    reharvestTime?: number;
    reharvestable: boolean;
    gardenBuff: Effect;
    baseValue: number;
    starValue: number;
    image: string;
    seedCost: number;
    seedGeneration: SeedGeneration;
    harvestQuantity: number[];
    width: number;
    height: number;
    requiredForBuffs: number;
};

export type CropTyping = {
    [cropName: string]: Crop,
}
export const crops: CropTyping = {
    Tomato: {
        name: "Tomato",
        growthTime: 4,
        image: '/images/crops/tomato.webp',
        reharvestable: true,
        gardenBuff: "Water Retain",
        baseValue: 25,
        starValue: 37,
        width: 1,
        height: 1,
        seedCost: 80,
        seedGeneration: {
            inputQuantity: 2,
            outputQuantity: 2,
            time: 0.75,
        },
        harvestQuantity: [2,2],
        requiredForBuffs: 1,
    },
    Potato: {
        name: "Potato",
        growthTime: 6,
        reharvestable: false,
        gardenBuff: "Water Retain",
        baseValue: 40,
        starValue: 60,
        image: '/images/crops/potato.webp',
        seedCost: 20,
        width: 1,
        height: 1,
        seedGeneration: {
            inputQuantity: 1,
            outputQuantity: 4,
            time: 1.5,
        },
        harvestQuantity: [2, 2],
        requiredForBuffs: 1,
    },
    Rice: {
        name: "Rice",
        growthTime: 3,
        image: '/images/crops/rice.webp',
        reharvestable: false,
        gardenBuff: "Increased Yield Amount",
        baseValue: 27,
        starValue: 40,
        seedCost: 15,
        width: 1,
        height: 1,
        seedGeneration: {
            inputQuantity: 1,
            outputQuantity: 4,
            time: 0.75,
        },
        harvestQuantity: [2, 2],
        requiredForBuffs: 1,
    },
    Wheat: {
        name: "Wheat",
        growthTime: 5,
        reharvestable: false,
        gardenBuff: "Increased Yield Amount",
        baseValue: 32,
        starValue: 48,
        image: '/images/crops/wheat.webp',
        seedCost: 20,
        width: 1,
        height: 1,
        seedGeneration: {
            inputQuantity: 1,
            outputQuantity: 4,
            time: 0.75,
        },
        harvestQuantity: [2, 2],
        requiredForBuffs: 1,
    },
    Carrot: {
        name: "Carrot",
        growthTime: 4,
        reharvestable: false,
        gardenBuff: "Weed Block",
        baseValue: 35,
        image: '/images/crops/carrot.webp',
        starValue: 52,
        seedCost: 15,
        width: 1,
        height: 1,
        seedGeneration: {
            inputQuantity: 1,
            outputQuantity: 4,
            time: 0.25,
        },
        harvestQuantity: [2, 2],
        requiredForBuffs: 1,
    },
    Onion: {
        name: "Onion",
        growthTime: 5,
        reharvestable: false,
        gardenBuff: "Weed Block",
        baseValue: 30,
        starValue: 45,
        seedCost: 20,
        width: 1,
        height: 1,
        image: '/images/crops/onion.webp',
        seedGeneration: {
            inputQuantity: 1,
            outputQuantity: 4,
            time: 0.5,
        },
        harvestQuantity: [2, 2],
        requiredForBuffs: 1,
    },
    Cotton: {
        name: "Cotton",
        growthTime: 4,
        reharvestable: false,
        gardenBuff: "Quality Boost",
        baseValue: 50,
        starValue: 75,
        image: '/images/crops/cotton.webp',
        seedCost: 40,
        width: 1,
        height: 1,
        seedGeneration: {
            inputQuantity: 1,
            outputQuantity: 3,
            time: 0.56,
        },
        harvestQuantity: [2, 2],
        requiredForBuffs: 1,
    },
    Blueberry: {
        name: "Blueberry",
        growthTime: 9,
        reharvestable: true,
        gardenBuff: "Grow Speed Increase",
        baseValue: 39,
        starValue: 58,
        seedCost: 0,
        width: 2,
        height: 2,
        image: '/images/crops/blueberry.webp',
        seedGeneration: {
            inputQuantity: 4,
            outputQuantity: 2,
            time: 1.3,
        },
        harvestQuantity: [6, 6],
        requiredForBuffs: 2,
    },
    Apple: {
        name: "Apple",
        growthTime: 12,
        reharvestable: true,
        gardenBuff: "Grow Speed Increase",
        baseValue: 64,
        seedCost: 0,
        starValue: 96,
        width: 3,
        height: 3,
        image: '/images/crops/apple.webp',
        seedGeneration: {
            inputQuantity: 10,
            outputQuantity: 1,
            time: 2.25,
        },
        harvestQuantity: [16,16],
        requiredForBuffs: 3,
    },
};


export type CropList = 'Onion' | 'Carrot' | 'Apple' | 'Tomato' | 'Potato' | 'Blueberry' | 'Wheat' | 'Rice' | 'Cotton';