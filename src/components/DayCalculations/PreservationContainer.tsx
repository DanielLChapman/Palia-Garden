import { Crop } from "@/data/crops";
const { uuid } = require("uuidv4");
import React, { useEffect, useState } from "react";
import { CropStates } from "./DayContainer";

const CRAFTER_OBJECTS = ["Loom", "Preservation Jar", "Seed Crafter"] as const;
type CrafterObjects = (typeof CRAFTER_OBJECTS)[number];

export function isCrafterObject(value: string): value is CrafterObjects {
    return CRAFTER_OBJECTS.includes(value as CrafterObjects);
}

type CrafterQueue = {
    name: string;
    starred: "regular" | "starred";
    amount: number;
};

export type CrafterState = {
    type: CrafterObjects;
    queue: CrafterQueue[];
    id: string;
};

type PreservationProps = {
    expectedCrops: CropStates;
    crafters: CrafterState[];
    setCrafters: React.Dispatch<React.SetStateAction<CrafterState[]>>;
    leftOverCrops: CropStates;
    setLeftOverCrops: React.Dispatch<React.SetStateAction<CropStates>>;
};

const PreservationContainer: React.FC<PreservationProps> = ({
    expectedCrops,
    crafters,
    setCrafters,
    leftOverCrops,
    setLeftOverCrops,
}) => {
    const maxNumber = 30;

    const handleAddCrafter = (crafterType: CrafterObjects) => {
        // Logic to add a crafter of the specified type
        if (crafters.length > maxNumber || !isCrafterObject(crafterType)) {
            return;
        }

        let newCrafter = {
            id: uuid,
            type: crafterType,
            queue: [],
        };

        setCrafters((prevCrafters) => [...prevCrafters, newCrafter]);
    };

    const handleRemoveCrafter = (id: string) => {
        // Logic to remove a crafter of the specified type
        const index = crafters.findIndex((crafter) => crafter.id === id);

        if (index === -1) {
            return;
        }

        let leftOverCopy = JSON.parse(JSON.stringify(leftOverCrops));

        //get queue, add it back to crops
        let craftQueue = crafters[index].queue;
        craftQueue.forEach((x) => {
            if (!leftOverCopy[x.name]) {
                leftOverCopy[x.name] = {
                    regular: {
                        count: 0,
                    },
                    starred: {
                        count: 0,
                    },
                    replants: 0,
                };
            }
            leftOverCopy[x.name][x.starred].count += x.amount;
        });

        //remove crafter
        let craftercopy = [...crafters];
        craftercopy.splice(index, 1);
        setCrafters([...craftercopy]);
        setLeftOverCrops({
            ...leftOverCopy,
        });
    };

    const resetCrafters = () => {
        let crafterCopy = [...crafters];
        for (let i = 0; i < crafterCopy.length; i++) {
            crafterCopy[i].queue = [];
        }

        setCrafters([...crafterCopy]);
    };

    useEffect(() => {
        resetCrafters();
    }, [expectedCrops]);

    return (
        <div className="w-full flex flex-col items-center">
            <div className="w-[28rem] flex flex-col items-center">
                <div className="flex justify-center space-x-4 py-6 px-4">
                    <div
                        className="w-32 h-32 border-2 border-red-800 cursor-pointer active:transform active:scale-95"
                        onClick={() => {
                            handleAddCrafter("Loom");
                        }}
                    ></div>

                    <div
                        className="w-32 h-32 border-2 border-red-800 cursor-pointer active:transform active:scale-95"
                        onClick={() => {
                            handleAddCrafter("Preservation Jar");
                        }}
                    ></div>

                    <div
                        className="w-32 h-32 border-2 border-red-800 cursor-pointer active:transform active:scale-95"
                        onClick={() => {
                            handleAddCrafter("Seed Crafter");
                        }}
                    ></div>
                </div>

                

            </div>

            <div className="p-4 w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {crafters.map((item, index) => (
                            <div key={index} className="border p-4">
                                {item.type}
                            </div>
                        ))}
                    </div>
                </div>
        </div>
    );
};

export default PreservationContainer;
