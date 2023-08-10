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
    gardenBuff: string;
    baseValue: number;
    starValue: number;
    seedCost: number;
    seedGeneration: SeedGeneration;
    harvestQuantity: number[];
};

export const crops: Record<string, Crop> = {
    Tomato: {
        name: "Tomato",
        growthTime: 4,
        reharvestTime: 2,
        reharvestable: true,
        gardenBuff: "Water Retain",
        baseValue: 25,
        starValue: 37,
        seedCost: 80,
        seedGeneration: {
            inputQuantity: 2,
            outputQuantity: 2,
            time: 0.75,
        },
        harvestQuantity: [2, 3],
    },
    Potato: {
        name: "Potato",
        growthTime: 6,
        reharvestable: false,
        gardenBuff: "Water Retain",
        baseValue: 40,
        starValue: 60,
        seedCost: 20,
        seedGeneration: {
            inputQuantity: 1,
            outputQuantity: 4,
            time: 1.5,
        },
        harvestQuantity: [2, 3],
    },
    Rice: {
        name: "Rice",
        growthTime: 3,
        reharvestable: false,
        gardenBuff: "Harvest Boost",
        baseValue: 27,
        starValue: 40,
        seedCost: 15,
        seedGeneration: {
            inputQuantity: 1,
            outputQuantity: 4,
            time: 0.75,
        },
        harvestQuantity: [2, 3],
    },
    Wheat: {
        name: "Wheat",
        growthTime: 5,
        reharvestable: false,
        gardenBuff: "Harvest Boost",
        baseValue: 32,
        starValue: 48,
        seedCost: 20,
        seedGeneration: {
            inputQuantity: 1,
            outputQuantity: 4,
            time: 0.75,
        },
        harvestQuantity: [2, 3],
    },
    Carrot: {
        name: "Carrot",
        growthTime: 4,
        reharvestable: false,
        gardenBuff: "Weed Prevention",
        baseValue: 35,
        starValue: 52,
        seedCost: 15,
        seedGeneration: {
            inputQuantity: 1,
            outputQuantity: 4,
            time: 0.25,
        },
        harvestQuantity: [2, 3],
    },
    Onion: {
        name: "Onion",
        growthTime: 5,
        reharvestable: false,
        gardenBuff: "Weed Prevention",
        baseValue: 30,
        starValue: 45,
        seedCost: 20,
        seedGeneration: {
            inputQuantity: 1,
            outputQuantity: 4,
            time: 0.5,
        },
        harvestQuantity: [2, 3],
    },
    Cotton: {
        name: "Cotton",
        growthTime: 4,
        reharvestable: false,
        gardenBuff: "Quality Boost",
        baseValue: 50,
        starValue: 75,
        seedCost: 40,
        seedGeneration: {
            inputQuantity: 1,
            outputQuantity: 3,
            time: 0.56,
        },
        harvestQuantity: [2, 3],
    },
    Blueberry: {
        name: "Blueberry",
        growthTime: 9,
        reharvestable: false,
        gardenBuff: "Grow Speed Increase",
        baseValue: 39,
        starValue: 58,
        seedCost: -1,
        seedGeneration: {
            inputQuantity: 4,
            outputQuantity: 2,
            time: 1.3,
        },
        harvestQuantity: [2, 3],
    },
    Apple: {
        name: "Apple",
        growthTime: 12,
        reharvestable: false,
        gardenBuff: "Grow Speed Increase",
        baseValue: 64,
        seedCost: -1,
        starValue: 96,
        seedGeneration: {
            inputQuantity: 10,
            outputQuantity: 1,
            time: 2.25,
        },
        harvestQuantity: [2, 3],
    },
};
