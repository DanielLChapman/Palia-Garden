export const SEED_CRAFTER_INPUTS = {
    "Carrot": { input: 1, craftingTime: 18/60, output: 4, outputType: "Carrot Seed" },
    "Onion": { input: 1, craftingTime: 24/60, output: 4, outputType: "Onion Seed" },
    "Potato": { input: 1, craftingTime: 84/60, output: 4, outputType: "Potato Seed" },
    "Tomato": { input: 2, craftingTime: 42/60, output: 2, outputType: "Tomato Plant Seed" },
    "Wheat": { input: 1, craftingTime: 42/60, output: 4, outputType: "Wheat Seed" },
    "Rice": { input: 1, craftingTime: 42/60, output: 4, outputType: "Rice Seed" },
    "Blueberry": { input: 4, craftingTime: 81/60, output: 2, outputType: "Blueberry Bush Seed" },
    "Apple": { input: 10, craftingTime: 142/60, output: 1, outputType: "Apple Tree Seed" },
    "Cotton": { input: 1, craftingTime: 36/60, output: 3, outputType: "Cotton Seed" },
};

export type SeedCrafterInputKey = keyof typeof SEED_CRAFTER_INPUTS;
