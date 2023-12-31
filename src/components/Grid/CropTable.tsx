import React from "react";

import { Crop, crops } from "@/data/crops";
import { effectToBorderClassMap } from "./GridCell";
import { Effect } from "../Effects";

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSeedling, faPoo } from '@fortawesome/free-solid-svg-icons'
import { useGrid } from "../useGrid";

type CropTableProps = {
    currentCrop: Crop | null;
    setCurrentCrop: React.Dispatch<React.SetStateAction<Crop | null>>;
    cropCounts: Map<string, number>;
    setDisplayTable: React.Dispatch<React.SetStateAction<'Crops'|'Fertilizer'>>;
};

export const CropTable: React.FC<CropTableProps> = ({
    currentCrop,
    setCurrentCrop,
    cropCounts,
    setDisplayTable
}) => {
    if (!crops) return <span>Please Refresh, something went wrong</span>;

    const getEffectBorder = (effect: Effect): string | null => {
        return effectToBorderClassMap[effect] || "effect-black";
    };
    return (
        <>
        
            <div className="flex flex-wrap justify-center ">
                {Object.keys(crops).map((crop, index) => (
                    <div
                        key={index}
                        className={`relative m-2 w-[75px] h-[75px] border-2 ${getEffectBorder(
                            crops[crop].gardenBuff
                        )} shadow-[0_0px_0px_1.5px_rgba(0,0,0,.6)] flex items-center justify-center cursor-pointer active:transform rounded-md active:scale-95 ${
                            currentCrop && crops[crop].name === currentCrop.name
                                ? "selected"
                                : ""
                        }`}
                        onClick={() => {
                            if (currentCrop?.name === crops[crop].name) {
                                return;
                            }
                            setCurrentCrop(crops[crop]);
                        }}
                    >
                        <Image
                            src={crops[crop].image}
                            alt={crops[crop].name}
                            width={32}
                            height={32}
                            className="icon-for-shadows"
                        />
                        <div className="absolute bottom-1 right-2 font-inter text-white font-semibold">
                            {crops[crop].growthTime}
                        </div>
                        {cropCounts.get(crops[crop].name) &&
                        //@ts-ignore
                            cropCounts.get(crops[crop].name) > 0 && (
                                <div className="absolute top-0.5 left-2 text-white text-sm font-inter icon-for-shadows">
                                   <FontAwesomeIcon icon={faSeedling} beat />: {cropCounts.get(crops[crop].name)}
                                </div>
                            )}
                    </div>
                ))}
                <div
                    key={-5}
                    className={`${!currentCrop ? 'selected' : ''} cursor-pointer shadow-[0_0px_0px_1.5px_rgba(0,0,0,.6)] relative text-4xl m-2  w-[75px] h-[75px] border-2 rounded-md effect-black flex items-center justify-center active:transform active:scale-95`}
                    onClick={() => {
                        setCurrentCrop(null);
                    }}
                >
                    <i className=" fa icon-for-shadows  ">&#xf12d;</i>
                </div>
                <div
                    key={-6}
                    className={`cursor-pointer shadow-[0_0px_0px_1.5px_rgba(0,0,0,.6)] relative text-4xl m-2  w-[75px] h-[75px] border-2 border-amber-600 rounded-md  flex items-center justify-center active:transform active:scale-95`}
                    onClick={() => {
                        setCurrentCrop(null);
                        setDisplayTable('Fertilizer')
                    }}
                >
                    <FontAwesomeIcon icon={faPoo} className="icon-for-shadows text-amber-600" />
                </div>
            </div>
        </>
    );
};
