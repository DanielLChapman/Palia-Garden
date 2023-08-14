import React from 'react';
import { GridCell, GridState } from '../useGrid';
import { GridCellComponent } from './GridCell';

type GridProps = {
    grid: GridState;
    setGrid: React.Dispatch<React.SetStateAction<GridState>>;
};



const Grid: React.FC<GridProps> = ({ grid, setGrid }) => {
    if (!grid) return <span>Something went really wrong</span>;

    const handleCellClick = (x: number, y: number) => {
        //handle click
    }
    return (
        <div className="grid-container flex flex-col">
            {grid.map((row, rowIndex) => (
                <div key={rowIndex} className="grid-row flex">
                    {row.map((cell, cellIndex) => (
                        <GridCellComponent
                            key={cellIndex}
                            cellData={cell}
                            x={rowIndex}
                            y={cellIndex}
                            onCellClick={handleCellClick}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Grid;
