import { useCallback, useEffect, useState } from 'react';
import { GridState, useGrid } from '../useGrid';
import { GridContext } from './GridContext';


type GridProviderProps = {
    children: React.ReactNode;
    urlID?: string | null | undefined;
};

export const GridProvider: React.FC<GridProviderProps> = ({ children, urlID }) => {
    const { grid: initialGridState, setGrid: setLocalGrid, recheckLocalStorage: loadGrid, saveGridToLocalStorage: saveGrid, gridCounts, checkString } = useGrid({ urlID });
    const [grid, setGrid] = useState(initialGridState);

    const updateGrid = useCallback((value: GridState) => {
        setGrid(value);
    }, [])

    useEffect(() => {
        setGrid(initialGridState);
    }, [initialGridState])

    return (
        <GridContext.Provider value={{ grid, updateGrid, saveGrid, loadGrid, gridCounts, checkString }}>
            {children}
        </GridContext.Provider>
    );
};
