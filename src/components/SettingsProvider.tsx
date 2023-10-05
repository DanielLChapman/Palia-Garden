import { useState } from "react";
import { SettingsContext } from "./SettingsContext";
import React, { ReactNode } from 'react';

type SettingsProviderProps = {
    children: ReactNode;
};



export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
    const [plantStarSeeds, setPlantStarSeeds] = useState<boolean>(false);
    const [overTwentyFive, setOverTwentyFive] = useState<boolean>(false);
    const [reinvestSeeds, setReinvestSeeds] = useState<boolean>(true);
    const [useStarSeeds, setUseStarSeeds] = useState<boolean>(true);

    return (
        <SettingsContext.Provider
            value={{
                plantStarSeeds,
                setPlantStarSeeds,
                overTwentyFive,
                setOverTwentyFive,
                reinvestSeeds,
                setReinvestSeeds,
                useStarSeeds,
                setUseStarSeeds,
            }}
        >
            {children}
        </SettingsContext.Provider>
    );
};
