export const SEED_CRAFTER_INPUTS = {
    "Carrot": { input: 1, craftingTime: 18/60, output: 4, outputType: "Carrot Seed" },
    "Onion": { input: 1, craftingTime: 24/60, output: 4, outputType: "Onion Seed" },
    "Potato": { input: 1, craftingTime: 84/60, output: 4, outputType: "Potato Seed" },
    "Tomato": { input: 3, craftingTime: 30/60, output: 2, outputType: "Tomato Plant Seed" },
    "Wheat": { input: 1, craftingTime: 42/60, output: 4, outputType: "Wheat Seed" },
    "Rice": { input: 1, craftingTime: 42/60, output: 4, outputType: "Rice Seed" },
    "Blueberry": { input: 4, craftingTime: 81/60, output: 2, outputType: "Blueberry Bush Seed" },
    "Apple": { input: 10, craftingTime: 142/60, output: 1, outputType: "Apple Tree Seed" },
    "Cotton": { input: 1, craftingTime: 36/60, output: 3, outputType: "Cotton Seed" },
};

export type SeedCrafterInputKey = keyof typeof SEED_CRAFTER_INPUTS;

type SeedSellValueType = {
    [key in SeedCrafterInputKey]: {
        regular: number;
        starred: number;
    };
};

export const seedSellValues: SeedSellValueType = {
    'Apple': {
        regular: 700,
        starred: 1050,
    },
    'Blueberry': {
        regular: 112,
        starred: 168,
    },
    'Carrot': {
        regular: 7,
        starred: 11, // Extrapolated
    },
    'Cotton': {
        regular: 20,
        starred: 30,
    },
    'Onion': {
        regular: 10,
        starred: 15,
    },
    'Potato': {
        regular: 20,
        starred: 30, // Extrapolated
    },
    'Rice': {
        regular: 11,
        starred: 16,
    },
    'Tomato': {
        regular: 40,
        starred: 60,
    },
    'Wheat': {
        regular: 12,
        starred: 18,
    },
};
