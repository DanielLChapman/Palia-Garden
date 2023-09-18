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
    regular_amount: number;
    starred_amount: number;
};

export type initialSeedsNeededState = {
    [name: string]: {
        amounts: neededSeeds;
    };
};

type initialSeedsCreatedState = {
    [name: string]: {
        amounts: neededSeeds;
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
    const [seedsCreate, setSeedsCreate] = useState<initialSeedsCreatedState>(
        {}
    );
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
            if (c.regularReplants + c.starredReplants > 0) {
                if (!newSeedsNeeded[x]) {
                    newSeedsNeeded[x] = {
                        amounts: {
                            regular_amount: 0,
                            starred_amount: 0,
                        },
                    };
                }

                newSeedsNeeded[x].amounts.regular_amount += c.regularReplants;
                newSeedsNeeded[x].amounts.starred_amount += c.starredReplants;
            }
        });

        return { total, newSeedsNeeded };
    };

    const calculateSeedCrafterProfit = (
        crafter: CrafterState,
        newSeedsCreatedObject: initialSeedsCreatedState
    ) => {
        let profit = 0;
        let crafterData = SEED_CRAFTER_INPUTS[crafter.name as SeedCrafterInputKey];
    
        if (crafterData && crafter.name) {
            // number of seeds made
            let output = crafterData.output * Math.floor(crafter.amount / crafterData.input);
            let altOutput = Math.random() < 0.04 ? 1 : 0;
    
            let [regular, starred] = [output, altOutput];
            if (crafter.starred === "starred") {
                [regular, starred] = [starred, regular];
            }
    
            // Immutable update
            const updatedSeedsCreatedObject = {
                ...newSeedsCreatedObject,
                [crafter.name]: {
                    amounts: {
                        regular_amount: (newSeedsCreatedObject[crafter.name]?.amounts.regular_amount || 0) + regular,
                        starred_amount: (newSeedsCreatedObject[crafter.name]?.amounts.starred_amount || 0) + starred,
                    },
                },
            };
    
            console.log("Returning from function:", updatedSeedsCreatedObject);
            return { profit, newSeedsCreatedObject: updatedSeedsCreatedObject };
        }
    
        // calculate harvest seeds
        return { profit, newSeedsCreatedObject };
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
                    console.log(
                        "Before calling calculateSeedCrafterProfit:",
                        newSeedsCreated
                    );

                    let { profit, newSeedsCreatedObject } =
                        calculateSeedCrafterProfit(crafter, newSeedsCreated);
                    console.log(
                        "After calling calculateSeedCrafterProfit:",
                        newSeedsCreatedObject
                    );

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
        return { crafterTotal: total, newSeedsCreated };
    };

    const sellSeeds = (
        seedsNeeded: initialSeedsNeededState,
        seedsCreated: initialSeedsCreatedState
    ) => {
        let profitFromSeeds = 0;

        let seedsNeededCopy = { ...seedsNeeded };
        let seedsCreatedCopy = { ...seedsCreated };

        if (reinvestSeeds) {
            // Use the seeds we've created to offset the seeds we need
            Object.keys(seedsNeededCopy).forEach((x) => {
                if (
                    seedsNeededCopy[x].amounts.regular_amount > 0 ||
                    seedsNeededCopy[x].amounts.starred_amount > 0
                ) {
                    // Ensure seedsCreatedCopy[x] exists or initialize it with default values
                    if (!seedsCreatedCopy[x]) {
                        seedsCreatedCopy[x] = {
                            amounts: {
                                regular_amount: 0,
                                starred_amount: 0,
                            },
                        };
                    }

                    // Use regular seeds first
                    //THIS NEEDS TO BE UPDATED WHEN STAR SEEDS ARE ALLOWED TO BE USED

                    let regularSeedsUsed = Math.min(
                        seedsNeededCopy[x].amounts.regular_amount,
                        seedsCreatedCopy[x].amounts.regular_amount
                    );
                    seedsNeededCopy[x].amounts.regular_amount -=
                        regularSeedsUsed;
                    seedsCreatedCopy[x].amounts.regular_amount -=
                        regularSeedsUsed;

                    // Use starred seeds if allowed and needed
                    if (
                        useStarSeeds &&
                        seedsNeededCopy[x].amounts.regular_amount > 0
                    ) {
                        let starredSeedsUsed = Math.min(
                            seedsNeededCopy[x].amounts.regular_amount,
                            seedsCreatedCopy[x].amounts.starred_amount
                        );
                        seedsNeededCopy[x].amounts.regular_amount -=
                            starredSeedsUsed;
                        seedsCreatedCopy[x].amounts.starred_amount -=
                            starredSeedsUsed;
                    }
                }
            });
        }

        Object.keys(seedsCreatedCopy).forEach((x) => {
            profitFromSeeds +=
                seedsCreatedCopy[x].amounts.regular_amount *
                seedSellValues[x as SeedCrafterInputKey].regular;
            seedsCreatedCopy[x].amounts.regular_amount = 0; // Reset the amount after selling

            profitFromSeeds +=
                seedsCreatedCopy[x].amounts.starred_amount *
                seedSellValues[x as SeedCrafterInputKey].starred;
            seedsCreatedCopy[x].amounts.starred_amount = 0; // Reset the amount after selling
        });

        return { profitFromSeeds, seedsNeededCopy, seedsCreatedCopy };
    };

    //UPDATE THAT LATER
    const calculateRebuy = (seedsNeeded: initialSeedsNeededState) => {
        let total = 0;
        Object.keys(seedsNeeded).forEach((x) => {
            if (seedsNeeded[x].amounts.regular_amount > 0) {
                total +=
                    seedsNeeded[x].amounts.regular_amount * crops[x].seedCost;
            }
            if (seedsNeeded[x].amounts.starred_amount > 0) {
                total +=
                    seedsNeeded[x].amounts.starred_amount * crops[x].seedCost; // Assuming starred seeds have the same cost
            }
        });

        return total;
    };

    useEffect(() => {
        let { total: leftOverTotal, newSeedsNeeded } = calculateLeftOverCrops();
        let { crafterTotal, newSeedsCreated } = calculateCrafters();
        let { profitFromSeeds, seedsNeededCopy, seedsCreatedCopy } = sellSeeds(
            newSeedsNeeded,
            newSeedsCreated
        );
        let totalCost = calculateRebuy(seedsNeededCopy);
        setCosts(totalCost);
        setProfits(leftOverTotal + crafterTotal + profitFromSeeds);
        setSeedsCreate(seedsCreatedCopy);
        setSeedsNeed(seedsNeededCopy);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [days, crafters, leftOverCrops, useStarSeeds, reinvestSeeds]);
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
