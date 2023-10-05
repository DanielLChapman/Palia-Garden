import React, { createContext, useContext, useState } from 'react';

type SettingsContextType = {
    plantStarSeeds: boolean;
    setPlantStarSeeds: React.Dispatch<React.SetStateAction<boolean>>;
    overTwentyFive: boolean;
    setOverTwentyFive: React.Dispatch<React.SetStateAction<boolean>>;
    reinvestSeeds: boolean;
    setReinvestSeeds: React.Dispatch<React.SetStateAction<boolean>>;
    useStarSeeds: boolean;
    setUseStarSeeds: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SettingsContext = createContext<SettingsContextType | undefined>(undefined);
