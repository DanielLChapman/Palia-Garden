import React, { createContext, useContext, useState, useCallback } from 'react';
import { GridState } from '../useGrid';

// Define the type for your grid context
type GridContextType = {
    grid: GridState;
    updateGrid: (value: GridState) => void;
    saveGrid: (value: GridState) => void;
    loadGrid: () => void;
};

// Create the context
export const GridContext = createContext<GridContextType | undefined>(undefined);
