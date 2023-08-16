import React from 'react';
import { Crop, crops } from "@/data/crops";
import { Effect } from '../Effects';
import { effectToBorderClassMap } from './GridCell';

import Image from "next/image";

type CropDisplayProps = {
    cropCounts: Map<string, number>
}

const CropDisplay:React.FC<CropDisplayProps> = ({cropCounts}) => {
    const getEffectBorder = (effect: Effect): string | null => {
        return effectToBorderClassMap[effect] || "effect-black";
    };
    return (
        <div className='flex flex-row justify-start space-between w-full border-2 border-black mt-4'>
            {
                Object.keys(crops).map((crop, i) => (
                    <div
                        key={i}
                        className={`relative m-2 w-24 h-24 border-2 ${getEffectBorder(
                            crops[crop].gardenBuff
                        )} flex items-center justify-center cursor-pointer active:transform active:scale-95`}
                    >
                        <Image
                            src={crops[crop].image}
                            alt={crops[crop].name}
                            width={32}
                            height={32}
                        />
                        <div className="absolute bottom-1 right-1">
                            {cropCounts.get(crops[crop].name)}
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default CropDisplay;