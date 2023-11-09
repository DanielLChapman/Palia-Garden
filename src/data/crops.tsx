import { Effect } from "@/components/Effects";

// crops.js
export type SeedGeneration = {
    inputQuantity: number;
    outputQuantity: number;
    time: number;
};

export type Crop = {
    id:number;
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
    timeUntilReharvest?: number;
    released: boolean;
};

export type CropTyping = {
    [cropName: string]: Crop,
}
export const crops: CropTyping = {
    Tomato: {
        id: 1,
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
            inputQuantity: 3,
            outputQuantity: 2,
            time: 0.5,
        },
        harvestQuantity: [2,2],
        requiredForBuffs: 1,
        timeUntilReharvest: 4,
        released: true,
    },
    Potato: {
        id: 2,
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
        released: true,
    },
    Rice: {
        id: 3,
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
        released: true,
    },
    Wheat: {
        id:4,
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
        released: true,
    },
    Carrot: {
        id:5,
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
        released: true,
    },
    Onion: {
        id: 6,
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
        released: true,
    },
    Cotton: {
        id: 7,
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
        released: true,
    },
    Blueberry: {
        id: 8,
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
        timeUntilReharvest: 4,
        released: true,
    },
    Apple: {
        id: 9, 
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
        timeUntilReharvest: 4,
        released: true,
    },
    Corn: {
        id: 10,
        name: "Corn",
        growthTime: 5,
        reharvestable: false,
        gardenBuff: "Increased Yield Amount",
        baseValue: 40,
        seedCost: 30,
        starValue: 60,
        width: 1,
        height: 1,
        image: '/images/crops/corn.webp',
        seedGeneration: {
            inputQuantity: 10,
            outputQuantity: 1,
            time: 2.25,
        },
        harvestQuantity: [2,2],
        requiredForBuffs: 1,
        timeUntilReharvest: 0,
        released: true,
    },
    'Spicy Pepper': {
        id: 11,
        name: "Spicy Pepper",
        growthTime: 6,
        reharvestable: true,
        gardenBuff: "Quality Boost",
        baseValue: 32,
        seedCost: 170,
        starValue: 48,
        width: 2,
        height: 2,
        image: '/images/crops/spicy_pepper.webp',
        seedGeneration: {
            inputQuantity: 10,
            outputQuantity: 1,
            time: 2.25,
        },
        harvestQuantity: [6,6],
        requiredForBuffs: 2,
        timeUntilReharvest: 4,
        released: true,
    }
    /*
    Apricot: {
        id: 12,
        name: "Apricot",
        growthTime: 12,
        reharvestable: true,
        timeUntilReharvest: 6,  // Time between reharvests
        gardenBuff: undefined,  // This is not provided, so I'm setting it to undefined for now
        baseValue: 97,
        starValue: 97 * 1.5,  // Assuming a 50% increase for starred value
        image: undefined,  // Image URL is not provided
        seedCost: undefined,  // Seed cost is not provided
        seedGeneration: undefined,  // Seed generation details are not provided
        harvestQuantity: undefined,  // Harvest quantity is not provided
        width: undefined,  // Width is not provided
        height: undefined,  // Height is not provided
        requiredForBuffs: undefined  // Required for buffs is not provided
        released: false,
    }*/
    
};

export function getCropById(id: number) {
    // Get all the values from the object
  const items = Object.values(crops);

  // Find the item with the given id
  const item = items.find(item => item.id === id);

  // If the item is found, return it
  if (item) {
    return item;
  }

  // If the item is not found, return null
  return null;
}


export type CropList = 'Onion' | 'Carrot' | 'Apple' | 'Tomato' | 'Potato' | 'Blueberry' | 'Wheat' | 'Rice' | 'Cotton' | 'Corn' | 'Spicy Pepper';