export const PRESERVES_VALUES = {
    "Tomato": {
        base: 23,
        starred: 34,
        processedRegular: 34,
        processedStarred: 51
    },
    "Blueberry": {
        base: 39,
        starred: 58,
        processedRegular: 59,
        processedStarred: 88
    },
    "Apple": {
        base: 64,
        starred: 96,
        processedRegular: 96,
        processedStarred: 144
    },
    "Potato": {
        base: 45,
        starred: 67,
        processedRegular: 68,
        processedStarred: 102
    },
    "Onion": {
        base: 30,
        starred: 45,
        processedRegular: 45,
        processedStarred: 67
    },
    "Carrot": {
        base: 23,
        starred: 34,
        processedRegular: 34,
        processedStarred: 51
    }
};

export type PreserveJarInputKey = keyof typeof PRESERVES_VALUES;
