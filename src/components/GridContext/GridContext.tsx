import React, { createContext, useContext, useState, useCallback } from 'react';
import { GridState } from '../useGrid';
import { CropCounts } from '../App';

// Define the type for your grid context
type GridContextType = {
    grid: GridState;
    updateGrid: (value: GridState) => void;
    saveGrid: (value: GridState) => void;
    loadGrid: () => void;
    gridCounts: CropCounts;
    checkString: (value: string) => void;
};

// Create the context
export const GridContext = createContext<GridContextType | undefined>(undefined);
