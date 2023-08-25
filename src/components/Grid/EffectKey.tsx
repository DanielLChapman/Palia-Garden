import React, { useState } from 'react';
import { effectToBgClassMap } from './GridCell';

export const EffectKey: React.FC = () => {
    const [expand, setExpand] = useState(false);
    const effects = [
        "Water Retain",
        "Quality Boost",
        "Grow Speed Increase",
        "Weed Block",
        "Increased Yield Amount",
        // ... add other effects here if needed
    ];

    return (
        <div className="px-4 pt-2 pb-1 -my-2 bg-gray-800 text-white rounded-md font-pt-serif">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-bold ">Effects Key</h3>
                <button 
                    onClick={() => setExpand(!expand)}
                    className=" p-1 ml-2 hover:bg-gray-600 transition-colors duration-200 "
                >
                    {expand ? <span>&#9650;</span> : <span>&#9660;</span>}
                </button>
            </div>
            {expand && (
                <ul>
                    {effects.map((effect) => (
                        <li key={effect} className="flex items-center mb-2">
                            <div className={`${effectToBgClassMap[effect]} w-5 h-5 rounded-full mr-3`}></div>
                            <span className="text-md">{effect}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
