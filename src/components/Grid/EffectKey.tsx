import React, { useState } from "react";
import { effectToBgClassMap, effectToBorderClassMap, effectToIconMap } from "./GridCell";
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

type EffectKeyProps = {
    hover: Effect | null,
    setHover: React.Dispatch<React.SetStateAction<Effect | null>>,
    selectedEffects: Effect[],
    setSelectedEffects: React.Dispatch<React.SetStateAction<Effect[]>>
}


export const EffectKey: React.FC<EffectKeyProps> = ({hover, setHover, selectedEffects, setSelectedEffects}) => {
    const [expand, setExpand] = useState(true);
    const effects = [
        "Water Retain",
        "Quality Boost",
        "Grow Speed Increase",
        "Weed Block",
        "Increased Yield Amount",
        // ... add other effects here if needed
    ];

    const handleHover = (target: Effect) => {
        setHover(target);
    }

    const handleRemoveHover = () => {
        setHover(null);
    }

    const handleEffectClick = (effect: Effect) => {
        if (selectedEffects.includes(effect)) {
            setSelectedEffects(prev => prev.filter(e => e !== effect));
        } else {
            setSelectedEffects(prev => [...prev, effect]);
        }
    }

    

    return (
        <div className="px-4 pt-2 pb-1 -my-2 bg-cambridge-blue text-gray-200 rounded-md font-inter">
            <div className="flex justify-between items-center mb-2 font-montserrat">
                <h3 className="text-lg font-bold ">Effects Key</h3>
                <button
                    onClick={() => setExpand(!expand)}
                    className=" p-1 ml-2 hover:bg-gray-600 transition-colors duration-200 "
                >
                    {expand ? <span>&#9650;</span> : <span>&#9660;</span>}
                </button>
            </div>
            {expand && (
                <div className="flex flex-wrap justify-center items-center">
                    {effects.map((effect, index) => {
                        const isSelectedEffectPresent = selectedEffects.some(effects => selectedEffects.includes(effect as Effect));
                        return (
                            <div key={effect} className="flex flex-col items-center m-2">
                                <div
                                    onMouseEnter={() => {
                                        handleHover(effect as Effect);
                                    }}
    
                                    onMouseLeave={() => {
                                        if (effect === hover) {
                                            handleRemoveHover();
                                        }
                                    }}
                                    onClick={() => handleEffectClick(effect as Effect)}
                                    className={`${effectToBorderClassMap[effect]} cursor-pointer effect-key-icon w-16 h-16 border-8 hover:scale-95 ${isSelectedEffectPresent ? 'bg-blue-200' : ''} hover:bg-cadet-gray`}
                                >
                                    <FontAwesomeIcon
                                        icon={effectToIconMap[effect]}
                                        size="2x"  // Increase the size of the icon
                                    />
                                </div>
                                <span className={`text-md text-center ${effectToBorderClassMap[effect]} effect-name`}>{effect}</span>
                            </div>
                        )
                    } )}
                </div>
            )}
        </div>
    );
};
