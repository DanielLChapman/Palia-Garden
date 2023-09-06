import React, { useEffect, useState } from "react";
import { CropStates } from "./DayContainer";
import { CrafterState } from "./PreservationContainer";
import { crops } from "@/data/crops";
import {
    SEED_CRAFTER_INPUTS,
    SeedCrafterInputKey,
    seedSellValues,
} from "@/data/seedCrafter";
import { PRESERVES_VALUES, PreserveJarInputKey } from "@/data/preservesJar";
import ProfitSettings from "./Profits/Settings";
import ProfitsDisplay from "./Profits/ProfitsDisplay";
import SeedsNeededDisplay from "./Profits/SeedsNeededDisplay";

type ProfitCalcType = {
    days: number;
    leftOverCrops: CropStates;
    crafters: CrafterState[];
};

type neededSeeds = {
    amount: number;
};

export type initialSeedsNeededState = {
    [name: string]: neededSeeds;
};

type initialSeedsCreatedState = {
    [name: string]: {
        regular: neededSeeds;
        starred: neededSeeds;
    };
};

type SeedSellValueType = {
    [key in SeedCrafterInputKey]: {
        regular: number;
        starred: number;
    };
};

const ProfitCalc: React.FC<ProfitCalcType> = ({
    days,
    leftOverCrops,
    crafters,
}) => {
    const [profits, setProfits] = useState(0);
    const [seedsNeed, setSeedsNeed] = useState<initialSeedsNeededState>({});
    const [useStarSeeds, setUseStarSeeds] = useState(true);
    const [seedsCreate, setSeedsCreate] = useState<initialSeedsCreatedState>({});
    const [reinvestSeeds, setReinvestSeeds] = useState(true);
    const [costs, setCosts] = useState(0);
    const [expandSeedsNeeded, setExpandSeedsNeeded] = useState(false);

    const calculateLeftOverCrops = () => {
        let newSeedsNeeded: initialSeedsNeededState = { ...{} };
        let total = 0;
        Object.keys(leftOverCrops).forEach((x) => {
            let c = leftOverCrops[x];
            if (c.regular.count > 0) {
                total += c.regular.count * crops[x].baseValue;
            }
            if (c.starred.count > 0) {
                total += c.starred.count * crops[x].starValue;
            }
            if (c.replants > 0) {
                if (!newSeedsNeeded[x]) {
                    newSeedsNeeded[x] = {
                        amount: 0,
                    };
                }

                newSeedsNeeded[x].amount += c.replants;
            }
        });

        return { total, newSeedsNeeded };
    };

    const calculateSeedCrafterProfit = (crafter: CrafterState, newSeedsCreatedObject: initialSeedsCreatedState) => {
        let profit = 0;
        let crafterData =
            SEED_CRAFTER_INPUTS[crafter.name as SeedCrafterInputKey];


        if (crafterData) {
            //number of seeds made

            //of the same type as the input
            let output =
                crafterData.output *
                Math.floor(crafter.amount / crafterData.input);
            let altOutput = 0;

            if (Math.random() < 0.04) {
                altOutput += 1;
            }

            let [regular, starred] = [output, altOutput];
            if (crafter.starred === "starred") {
                [regular, starred] = [starred, regular];
            }

            if (!newSeedsCreatedObject[crafter.name || "default"]) {
                newSeedsCreatedObject = {
                    ...newSeedsCreatedObject,
                    [crafter.name || "default"]: {
                        regular: {
                            amount: 0,
                        },
                        starred: {
                            amount: 0,
                        },
                    },
                };
            }

            newSeedsCreatedObject = {
                ...newSeedsCreatedObject ,
                [crafter.name || "default"]: {
                    regular: {
                        amount:
                        newSeedsCreatedObject[crafter.name || "default"].regular
                                .amount + regular,
                    },
                    starred: {
                        amount:
                        newSeedsCreatedObject[crafter.name || "default"].starred
                                .amount + starred,
                    },
                },
            };
        }
        return {profit, newSeedsCreatedObject};
    };

    const calculateLoomProfit = (crafter: CrafterState) => {
        let profit = 0;
        if (crafter.name !== null) {
            profit += crafter.amount * 48;
        }
        return profit;
    };

    const calculatePreservationJarProfit = (crafter: CrafterState) => {
        let profit = 0;
        if (crafter.name !== null) {
            let jar = PRESERVES_VALUES[crafter.name as PreserveJarInputKey];
            let value = jar.processedRegular;
            if (crafter.starred) {
                value = jar.processedStarred;
            }

            profit += value * crafter.amount;
        }
        return profit;
    };

    const calculateCrafters = () => {
        let total = 0;
        let newSeedsCreated: initialSeedsCreatedState = { ...{} };
        for (let crafter of crafters) {
            if (crafter.name === null) {
                continue;
            }
            switch (crafter.type) {
                case "Seed Crafter":
                    let {profit, newSeedsCreatedObject} = calculateSeedCrafterProfit(crafter, newSeedsCreated);
                    total += profit;
                    newSeedsCreated = newSeedsCreatedObject;
                    break;
                case "Loom":
                    total += calculateLoomProfit(crafter);
                    break;
                case "Preservation Jar":
                    total += calculatePreservationJarProfit(crafter);
                    break;
                default:
            }
        }
        return {crafterTotal: total, newSeedsCreated};
    };

    const sellSeeds = (seedsNeeded: initialSeedsNeededState, seedsCreated: initialSeedsCreatedState) => {
        let profitFromSeeds = 0;

        let seedsNeededCopy = { ...seedsNeeded };
        let seedsCreatedCopy = { ...seedsCreated };
        if (reinvestSeeds) {
            // Use the seeds we've created to offset the seeds we need
            Object.keys(seedsNeededCopy).forEach((x) => {
                if (seedsNeededCopy[x].amount > 0) {
                    // Ensure seedsCreatedCopy[x] exists or initialize it with default values
                    if (!seedsCreatedCopy[x]) {
                        seedsCreatedCopy[x] = {
                            regular: { amount: 0 },
                            starred: { amount: 0 }
                        };
                    }
        
                    // Use regular seeds first
                    let regularSeedsUsed = Math.min(
                        seedsNeededCopy[x].amount,
                        seedsCreatedCopy[x].regular.amount
                    );
                    seedsNeededCopy[x].amount -= regularSeedsUsed;
                    seedsCreatedCopy[x].regular.amount -= regularSeedsUsed;
        
                    // Use starred seeds if allowed and needed
                    if (useStarSeeds && seedsNeededCopy[x].amount > 0) {
                        let starredSeedsUsed = Math.min(
                            seedsNeededCopy[x].amount,
                            seedsCreatedCopy[x].starred.amount
                        );
                        seedsNeededCopy[x].amount -= starredSeedsUsed;
                        seedsCreatedCopy[x].starred.amount -= starredSeedsUsed;
                    }
                }
            });
        }


        Object.keys(seedsCreatedCopy).forEach((x) => {
            profitFromSeeds +=
                seedsCreatedCopy[x].regular.amount *
                seedSellValues[x as SeedCrafterInputKey].regular;
            seedsCreatedCopy[x].regular.amount = 0; // Reset the amount after selling
    
            profitFromSeeds +=
                seedsCreatedCopy[x].starred.amount *
                seedSellValues[x as SeedCrafterInputKey].starred;
            seedsCreatedCopy[x].starred.amount = 0; // Reset the amount after selling
        });

        return {profitFromSeeds, seedsNeededCopy, seedsCreatedCopy};
    };

    const calculateRebuy = (seedsNeeded: initialSeedsNeededState) => {
        let total = 0;
        Object.keys(seedsNeeded).forEach((x) => {
            if (seedsNeeded[x].amount > 0) {
                total += seedsNeeded[x].amount * crops[x].seedCost;
            }
        });

        return total;
    };

    useEffect(() => {
        let { total: leftOverTotal, newSeedsNeeded } = calculateLeftOverCrops();
        let {crafterTotal, newSeedsCreated } = calculateCrafters();
        let {profitFromSeeds, seedsNeededCopy, seedsCreatedCopy} = sellSeeds(newSeedsNeeded, newSeedsCreated);
        let totalCost = calculateRebuy(seedsNeededCopy);
        setCosts(totalCost);
        setProfits(leftOverTotal + crafterTotal + profitFromSeeds);
        setSeedsCreate(seedsCreatedCopy);
        setSeedsNeed(seedsNeededCopy);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [days, crafters, leftOverCrops, useStarSeeds, reinvestSeeds])


    return (
        <div className="space-y-2">
            <div className=" p-4 rounded-md ">
                <ProfitSettings 
                    useStarSeeds={useStarSeeds} 
                    setUseStarSeeds={setUseStarSeeds}
                    reinvestSeeds={reinvestSeeds}
                    setReinvestSeeds={setReinvestSeeds}
                />
            </div>
            <div className=" p-4 rounded-md ">
                <ProfitsDisplay profits={profits} costs={costs} />
            </div>
            <div className="p-4 rounded-md ">
                <SeedsNeededDisplay
                    seedsNeeded={seedsNeed} 
                    expandSeedsNeeded={expandSeedsNeeded}
                    setExpandSeedsNeeded={setExpandSeedsNeeded}
                />
            </div>
        </div>
    );
};

export default ProfitCalc;
