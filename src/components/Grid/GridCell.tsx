import { GridCell } from "../useGrid";

type GridCellProps = {
    cellData: GridCell;
    x: number;
    y: number;
    onCellClick: (x: number, y: number) => void;
};

export const effectToBorderClassMap: Record<string, string> = {
    "Water Retain": "effect-red",
    "Quality Boost": "effect-orange",
    "Grow Speed Increase": "effect-yellow",
    "Weed Block": "effect-purple",
    "Increased Yield Amount": "effect-blue",
    // ... other effects
};

// For background colors (used in GridCellComponent)
export const effectToBgClassMap: Record<string, string> = {
    "Water Retain": "bg-red-500",
    "Quality Boost": "bg-orange-500",
    "Grow Speed Increase": "bg-yellow-500",
    "Weed Block": "bg-purple-500",
    "Increased Yield Amount": "bg-blue-500",
    // ... other effects
};

export const GridCellComponent: React.FC<GridCellProps> = ({ cellData, x, y, onCellClick }) => {
    return (
        <div className={`grid-cell w-[75px] h-[75px] border-2 border-black  m-1 bg-field-drab relative`} onClick={() => {
            onCellClick(x, y)
        }}>
            {/* Render the crop image in the center */}
            {cellData.crop && (
                <img src={cellData.crop.image} alt={cellData.crop.name} className="absolute inset-1/4 w-1/2 h-1/2" />
            )}

            {/* Render colored boxes on the top row for each effect */}
            <div className="absolute top-0 left-0 w-full flex">
                {cellData.effects.map((effect, index) => (
                    <div key={index} className={`${effectToBgClassMap[effect]} w-1/5 h-4`}></div>
                ))}
            </div>
        </div>
    );
};