import { GridCell } from "../useGrid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTint,
    faStar,
    faForward,
    IconDefinition,
    faBan,
    faArrowUpWideShort,
} from "@fortawesome/free-solid-svg-icons";
import { Effect } from "../Effects";
import { Crop } from "@/data/crops";
import { Fertilizer } from "@/data/fertilizer";
import { generateStars } from "./GenerateStars";

type GridCellProps = {
    cellData: GridCell;
    x: number;
    y: number;
    onCellClick: (x: number, y: number) => void;
    hover: Effect | null;
    selectedEffects: Effect[];
    currentCrop: Crop | null;
    fertilizer?: Fertilizer;
};

export const effectToBorderClassMap: Record<string, string> = {
    "Water Retain": "effect-blue",
    "Quality Boost": "effect-orange",
    "Grow Speed Increase": "effect-red",
    "Weed Block": "effect-purple",
    "Increased Yield Amount": "effect-green",
    // ... other effects
};

// For background colors (used in GridCellComponent)
export const effectToBgClassMap: Record<string, string> = {
    "Water Retain": "bg-blue-800",
    "Quality Boost": "bg-orange-800",
    "Grow Speed Increase": "bg-red-800",
    "Weed Block": "bg-purple-800",
    "Increased Yield Amount": "bg-green-800",
    // ... other effects
};

export const effectToIconMap: Record<string, IconDefinition> = {
    "Water Retain": faTint, // FontAwesome water droplet icon
    "Quality Boost": faStar,
    "Grow Speed Increase": faForward,
    "Weed Block": faBan,
    "Increased Yield Amount": faArrowUpWideShort,
};

export const effectToFertilizerClassMap: Record<string, string> = {
    "Water Retain": "fertilizer-blue",
    "Quality Boost": "fertilizer-orange",
    "Grow Speed Increase": "fertilizer-red",
    "Weed Block": "fertilizer-purple",
    "Increased Yield Amount": "fertilizer-green",
    // ... other effects
};

export const GridCellComponent: React.FC<GridCellProps> = ({
    cellData,
    x,
    y,
    hover,
    onCellClick,
    selectedEffects,
    currentCrop,
}) => {
    const isSelectedEffectPresent = cellData.effects.some((effect) =>
        selectedEffects.includes(effect as Effect)
    );

    const renderFertilizerStars = () => {
        if (cellData.fertilizer) {
            // Fertilizer is present, get the corresponding color class
            const colorClass =
                effectToFertilizerClassMap[cellData.fertilizer.gardenBuff];
            const stars = generateStars(10, colorClass); // generate 20 stars
            return <>{stars}</>;
        }
        return null; // No fertilizer, don't render stars
    };

    return (
        <div
            className={`grid-cell w-[65px] h-[65px] border-2 border-black transition delay-75 m-1 relative ${
                currentCrop === null
                    ? cellData.crop
                        ? "hover:bg-red-500 hover:delay-0"
                        : "hover:bg-green-500 hover:delay-0"
                    : currentCrop.name !== cellData.crop?.name && cellData.crop
                    ? "hover:bg-red-500 hover:delay-0"
                    : cellData.crop === null
                    ? "hover:bg-green-500 hover:delay-0"
                    : ""
            }
               ${
                   cellData.effects.includes(hover as Effect)
                       ? "bg-blue-300"
                       : isSelectedEffectPresent
                       ? "bg-cadet-gray"
                       : "bg-field-drab"
               }`}
            onClick={() => {
                onCellClick(x, y);
            }}
        >
            {/* Render the crop image in the center */}
            {cellData.crop && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    src={cellData.crop.image}
                    alt={cellData.crop.name}
                    className="absolute inset-1/4 w-1/2 h-1/2 icon-for-shadows"
                />
            )}

            {/* Render colored boxes on the top row for each effect */}
            <div className="absolute top-0 left-0 w-full flex">
                {cellData.effects.map((effect, index) => (
                    <div
                        key={index}
                        className={`${effectToBorderClassMap[effect]} effect-icon m-0.25`}
                    >
                        <FontAwesomeIcon
                            icon={effectToIconMap[effect]}
                            size="xs"
                            className="icon-for-shadows"
                        />
                        {/*<div key={index} className={`${effectToBgClassMap[effect]} w-1/5 h-4`}></div>*/}
                    </div>
                ))}
            </div>

            {/* render if a starred cell */}
            {cellData.starred === "starred" && (
                <div className="absolute bottom-1 left-1 flex items-center space-x-2">
                    <FontAwesomeIcon
                        icon={faStar}
                        className="text-yellow-500 icon-for-shadows"
                    />
                </div>
            )}

        </div>
    );
};
