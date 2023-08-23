import { Crop } from "@/data/crops";
const { uuid } = require("uuidv4");
import React, { useEffect, useState } from "react";
import { CropStates } from "./DayContainer";
import CropDropDown from "./CropDropDown";
import { SEED_CRAFTER_INPUTS, SeedCrafterInputKey } from "@/data/seedCrafter";

const CRAFTER_OBJECTS = ["Loom", "Preservation Jar", "Seed Crafter"] as const;
export type CrafterObjects = (typeof CRAFTER_OBJECTS)[number];

export function isCrafterObject(value: string): value is CrafterObjects {
    return CRAFTER_OBJECTS.includes(value as CrafterObjects);
}
/*
type CrafterQueue = {
    name: string;
    starred: "regular" | "starred";
    amount: number;
};*/

export type CrafterState = {
    type: CrafterObjects;
    id: string;
    name: string | null;
    starred: "regular" | "starred";
    amount: number;
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

        let newCrafter: CrafterState = {
            id: uuid(),
            type: crafterType,
            name: null,
            starred: "regular",
            amount: 0,
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
        let craftQueue = crafters[index];
        if (craftQueue.name !== null) {
            if (!leftOverCopy[craftQueue.name]) {
                leftOverCopy[craftQueue.name] = {
                    regular: {
                        count: 0,
                    },
                    starred: {
                        count: 0,
                    },
                    replants: 0,
                };
            }
            leftOverCopy[craftQueue.name][craftQueue.starred].count +=
                craftQueue.amount;

            setLeftOverCrops({
                ...leftOverCopy,
            });
        }

        //remove crafter
        let craftercopy = [...crafters];
        craftercopy.splice(index, 1);
        setCrafters([...craftercopy]);
    };

    const resetCrafters = () => {
        let crafterCopy = [...crafters];
        for (let i = 0; i < crafterCopy.length; i++) {
            crafterCopy[i].name = null;
            crafterCopy[i].starred = "regular";
            crafterCopy[i].amount = 0;
        }

        setCrafters([...crafterCopy]);
    };

    useEffect(() => {
        resetCrafters();
    }, [expectedCrops]);

    const handleSelect = (
        id: string,
        type: string,
        starred: "starred" | "regular"
    ) => {
        const index = crafters.findIndex((crafter) => crafter.id === id);

        if (index === -1) {
            return;
        }

        const updatedCrafter = { ...crafters[index] };

        if (
            updatedCrafter.name !== null &&
            (type !== updatedCrafter.name ||
                starred !== updatedCrafter.starred) &&
            updatedCrafter.amount > 0
        ) {
            const leftOverCopy = { ...leftOverCrops };
            if (!leftOverCopy[type]) {
                leftOverCopy[type] = {
                    regular: {
                        count: 0,
                    },
                    starred: {
                        count: 0,
                    },
                    replants: 0,
                };
            }
            leftOverCopy[updatedCrafter.name][updatedCrafter.starred].count +=
                updatedCrafter.amount;

            setLeftOverCrops(leftOverCopy);
        }

        updatedCrafter.name = type;
        updatedCrafter.amount = 0;
        updatedCrafter.starred = starred;

        const updatedCrafters = [...crafters];
        updatedCrafters[index] = updatedCrafter;

        setCrafters(updatedCrafters);
    };

    const decreaseCrops = (id: string) => {
        const index = crafters.findIndex((crafter) => crafter.id === id);
        if (index === -1) {
            return;
        }
        const currentCrafter = crafters[index];
        if (currentCrafter.name === null || currentCrafter.amount <= 0) {
            return;
        }

        let amount = 1;
        if (currentCrafter.type === 'Seed Crafter' && currentCrafter.name in SEED_CRAFTER_INPUTS) {
            amount = SEED_CRAFTER_INPUTS[currentCrafter.name as SeedCrafterInputKey].input;
        }

        if (
            amount >
            leftOverCrops[currentCrafter.name][currentCrafter.starred].count
        ) {
            alert("Not Enough To Allocate");
            return;
        }
        const updatedCrafter = { ...currentCrafter };
        const leftOverCopy = JSON.parse(JSON.stringify(leftOverCrops)); // Deep copy
        updatedCrafter.amount -= amount;
        leftOverCopy[currentCrafter.name][currentCrafter.starred].count +=
            amount;

        setLeftOverCrops(leftOverCopy);
        const updatedCrafters = [...crafters];
        updatedCrafters[index] = updatedCrafter;
        setCrafters(updatedCrafters);
    };

    const allocateCrops = (id: string) => {
        const index = crafters.findIndex((crafter) => crafter.id === id);
        if (index === -1) {
            return;
        }
        const currentCrafter = crafters[index];
        if (
            currentCrafter.name === null ||
            !leftOverCrops[currentCrafter.name] ||
            leftOverCrops[currentCrafter.name][currentCrafter.starred].count ===
                0
        ) {
            return;
        }

        let amount = 1;
        if (currentCrafter.type === 'Seed Crafter' && currentCrafter.name in SEED_CRAFTER_INPUTS) {
            amount = SEED_CRAFTER_INPUTS[currentCrafter.name as SeedCrafterInputKey].input;
        }
        

        if (
            amount >
            leftOverCrops[currentCrafter.name][currentCrafter.starred].count
        ) {
            alert("Not Enough To Allocate");
            return;
        }

        if (
            amount >
            leftOverCrops[currentCrafter.name][currentCrafter.starred].count
        ) {
            alert("Not Enough To Allocate");
            return;
        }

        const updatedCrafter = { ...currentCrafter };
        const leftOverCopy = JSON.parse(JSON.stringify(leftOverCrops)); // Deep copy
        updatedCrafter.amount += amount;
        leftOverCopy[currentCrafter.name][currentCrafter.starred].count -=
            amount;

        setLeftOverCrops(leftOverCopy);
        const updatedCrafters = [...crafters];
        updatedCrafters[index] = updatedCrafter;
        setCrafters(updatedCrafters);
    };

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
                        <div
                            key={index}
                            className="border p-4 flex flex-col relative"
                        >
                            {/* Top Row: item.type on the left and X on the right */}
                            <div className="flex justify-between items-center mb-2">
                                <span>{item.type}</span>
                                <div
                                    className="cursor-pointer"
                                    onClick={() => {
                                        handleRemoveCrafter(item.id);
                                    }}
                                >
                                    X
                                </div>
                            </div>

                            {/* Middle Row: CropDropDown */}
                            <div className="mb-2 flex justify-center space-x-5">
                                <CropDropDown
                                    leftOverCrops={leftOverCrops}
                                    type={item.type}
                                    handleSelect={handleSelect}
                                    id={item.id}
                                    selectedCropName={item.name}
                                    selectedCropType={item.starred}
                                />
                            </div>

                            {/* Bottom Row: Centered decrease, amount, increase */}
                            <div className="flex justify-center space-x-5">
                                <button
                                    className=""
                                    aria-disabled={
                                        item.type === null || item.amount === 0
                                    }
                                    disabled={
                                        item.type === null || item.amount === 0
                                    }
                                    onClick={() => {
                                        decreaseCrops(item.id);
                                    }}
                                >
                                    decrease
                                </button>
                                <span>{item.amount}</span>
                                <button
                                    className=""
                                    aria-disabled={item.type === null}
                                    disabled={item.type === null}
                                    onClick={() => {
                                        allocateCrops(item.id);
                                    }}
                                >
                                    increase
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PreservationContainer;
