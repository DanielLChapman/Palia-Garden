import React from 'react';
import { GridCell, GridState } from '../useGrid';

type GridProps = {
    grid: GridState;
    setGrid: React.Dispatch<React.SetStateAction<GridState>>;
};

const Grid: React.FC<GridProps> = ({ grid, setGrid }) => {
    if (!grid) return <span>Something went really wrong</span>;
    return (
        <div>
            {/* Render the grid here */}
        </div>
    );
}

export default Grid;
