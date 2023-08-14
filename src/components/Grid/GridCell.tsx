import { GridCell } from "../useGrid";

type GridCellProps = {
    cellData: GridCell;
    x: number;
    y: number;
    onCellClick: (x: number, y: number) => void;
};

const effectToClassMap: Record<string, string> = {
    "Water Retain": "effect-red",
    "Quality Boost": "effect-orange",
    "Grow Speed Increase": "effect-yellow",
    "Weed Block": "effect-green",
    "Increased Yield Amount": "effect-blue",
    // ... other effects
};

export const GridCellComponent: React.FC<GridCellProps> = ({ cellData, x, y, onCellClick }) => {
    const renderEffects = (effects: string[]) => {
        if (effects.length === 0) {
            return (
                <div className="innermost-div flex items-center justify-center min-h-[65px] max-h-[75px]">
                    <div>
                        hi
                    </div>
                </div>
            );
        }

        const effect = effects[0];
        const remainingEffects = effects.slice(1);
        const effectClass = effectToClassMap[effect];

        return (
            <div className={`${effectClass} w-full min-h-[65px] max-h-[75px]`}>
                {renderEffects(remainingEffects)}
            </div>
        );
    };


    return (
        <div className={`grid-cell w-[75px] h-[75px] border-2 border-black-300 m-1 shadow-inner-blue shadow-inner-yellow`} onClick={() => onCellClick(x, y)}>
            {renderEffects(cellData.effects)}
        </div>
    );
};
