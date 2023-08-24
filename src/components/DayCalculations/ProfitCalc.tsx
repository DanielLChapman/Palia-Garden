import React, { useEffect, useState } from "react";
import { CropStates } from "./DayContainer";
import { CrafterState } from "./PreservationContainer";
import { crops } from "@/data/crops";
import { SEED_CRAFTER_INPUTS, SeedCrafterInputKey } from "@/data/seedCrafter";
import { PRESERVES_VALUES, PreserveJarInputKey } from "@/data/preservesJar";

type ProfitCalcType = {
    days: number;
    leftOverCrops: CropStates;
    crafters: CrafterState[];
};

type neededSeeds = {
    amount: number;
};

type initialSeedsNeededState = {
    [name: string]: neededSeeds;
};

type initialSeedsCreatedState = {
    [name: string]: {
        regular: neededSeeds;
        starred: neededSeeds;
    };
};

const ProfitCalc: React.FC<ProfitCalcType> = ({
    days,
    leftOverCrops,
    crafters,
}) => {
    const [profits, setProfits] = useState(0);
    const [seedsNeeded, setSeedsNeeded] = useState<initialSeedsNeededState>({});
    const [useStarSeeds, setUseStarSeeds] = useState(true);
    const [seedsCreated, setSeedsCreated] = useState<initialSeedsCreatedState>(
        {}
    );

    const calculateLeftOverCrops = () => {
        let newSeedsNeeded: initialSeedsNeededState = { ...seedsNeeded };
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

        setSeedsNeeded(newSeedsNeeded);

        return total;
    };

    const calculateSeedCrafterProfit = (crafter: CrafterState) => {
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

            if (!seedsCreated[crafter.name  || 'default']) {
                setSeedsCreated((prevSeeds) => ({
                    ...prevSeeds,
                    [crafter.name || 'default']: {
                        regular: {
                            amount: 0,
                        },
                        starred: {
                            amount: 0,
                        },
                    },
                }));
            }

            setSeedsCreated((prevSeeds) => ({
                ...prevSeeds,
                [crafter.name || 'default']: {
                    regular: {
                        amount: prevSeeds[crafter.name || 'default'].regular.amount + regular,
                    },
                    starred: {
                        amount: prevSeeds[crafter.name || 'default'].starred.amount + starred,
                    },
                },
            }));
        }
        return profit;
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
        for (let crafter of crafters) {
            if (crafter.name === null) {
                continue;
            }
            switch (crafter.type) {
                case "Seed Crafter":
                    total += calculateSeedCrafterProfit(crafter);
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
        return total;
    };

    const sellSeeds = () => {
        let profitFromSeeds = 0;
        // Subtract neededSeeds from seedsCreated and calculate profit
        // ...
        return profitFromSeeds;
    };

    const calculateProfits = () => {
        let total = 0;

        //leftOverCrops
        total += calculateLeftOverCrops();
        console.log(total);

        //Crafters
        total += calculateCrafters();
        console.log(total);

        return total;
    };

    useEffect(() => {
        let total = calculateProfits();
        setProfits(total);
    }, [days, leftOverCrops, crafters]);

    return <div></div>;
};

export default ProfitCalc;
