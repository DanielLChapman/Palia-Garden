import React from 'react';
import { Crop, crops } from "@/data/crops";
import { Effect } from '../Effects';
import { effectToBorderClassMap } from './GridCell';

import Image from "next/image";
import { CropStates } from '../DayCalculations/DayContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faLeaf } from '@fortawesome/free-solid-svg-icons';

type CropDisplayProps = {
    currentCrops: CropStates
    // cropCounts: Map<string, number>
}

const CropDisplay: React.FC<CropDisplayProps> = ({ currentCrops }) => {
    const getEffectBorder = (effect: Effect): string | null => {
        return effectToBorderClassMap[effect] || "effect-black";
    };

    return (
        <div>
            {/* Title Line */}
            <div className="text-center mb-4">
                <span className="mr-3">Generated Crops:</span>
                <FontAwesomeIcon icon={faLeaf} className="text-green-500 mr-2" />
                <span>= Regular</span>
                <FontAwesomeIcon icon={faStar} className="text-yellow-500 mx-3" />
                <span>= Starred</span>
            </div>

            <div className='flex flex-row flex-wrap justify-center items-center w-full mt-4 p-2 space-x-2 space-y-2 align-middle'>
                {Object.keys(crops).map((crop, i) => (
                    <div
                        key={i}
                        className={`relative group w-24 h-24 border-2 ${getEffectBorder(
                            crops[crop].gardenBuff
                        )} flex items-center justify-center cursor-pointer transform transition-transform duration-150 hover:scale-105 ${i === 0 ? 'mt-[7px]' : ''}`}
                    >
                        <Image
                            src={crops[crop].image}
                            alt={crops[crop].name}
                            width={32}
                            height={32}
                            className="z-10"
                        />
                        <div className="absolute top-1 left-1 flex items-center space-x-2">
                            <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
                            <span className="text-sm">{currentCrops[crops[crop].name].starred.count}</span>
                        </div>

                        <div className="absolute bottom-1 right-1 flex items-center space-x-2">
                            <FontAwesomeIcon icon={faLeaf} className="text-green-500" />
                            <span className="text-sm">{currentCrops[crops[crop].name].regular.count}</span>
                        </div>

                        {/* Optional overlay on hover */}
                        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10"></div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CropDisplay;
