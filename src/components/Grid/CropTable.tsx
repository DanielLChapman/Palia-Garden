import React from "react";

import { Crop, crops } from "@/data/crops";
import { effectToBorderClassMap } from "./GridCell";
import { Effect } from "../Effects";

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSeedling } from '@fortawesome/free-solid-svg-icons'

type CropTableProps = {
    currentCrop: Crop | null;
    setCurrentCrop: React.Dispatch<React.SetStateAction<Crop | null>>;
    cropCounts: Map<string, number>;
};

export const CropTable: React.FC<CropTableProps> = ({
    currentCrop,
    setCurrentCrop,
    cropCounts,
}) => {
    if (!crops) return <span>Please Refresh, something went wrong</span>;

    const getEffectBorder = (effect: Effect): string | null => {
        return effectToBorderClassMap[effect] || "effect-black";
    };
    return (
        <>
            <div className="md:hidden">
                {Object.keys(crops).map((crop, index) => (
                    <div key={index} className="relative">
                        <button className="w-full text-left p-2 border-b">
                            {crops[crop].name}
                        </button>
                        <div className="absolute left-0 w-full bg-white z-10 hidden">
                            <div
                                className={`flex items-center border mb-4 ${getEffectBorder(
                                    crops[crop].gardenBuff
                                )} `}
                            >
                                <Image
                                    src={crops[crop].image}
                                    alt={crops[crop].name}
                                    layout="fill"
                                    objectFit="cover"
                                />
                                <div className="p-2">
                                    {crops[crop].growthTime} days
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex flex-wrap justify-center">
                {Object.keys(crops).map((crop, index) => (
                    <div
                        key={index}
                        className={`relative m-2 w-24 h-24 border-2 ${getEffectBorder(
                            crops[crop].gardenBuff
                        )} flex items-center justify-center cursor-pointer active:transform active:scale-95 ${
                            currentCrop && crops[crop].name === currentCrop.name
                                ? "selected"
                                : ""
                        }`}
                        onClick={() => {
                            setCurrentCrop(crops[crop]);
                        }}
                    >
                        <Image
                            src={crops[crop].image}
                            alt={crops[crop].name}
                            width={32}
                            height={32}
                        />
                        <div className="absolute bottom-1 right-1">
                            {crops[crop].growthTime}
                        </div>
                        {cropCounts.get(crops[crop].name) &&
                        //@ts-ignore
                            cropCounts.get(crops[crop].name) > 0 && (
                                <div className="absolute top-1 left-1 text-green-800">
                                   <FontAwesomeIcon icon={faSeedling} beat />: {cropCounts.get(crops[crop].name)}
                                </div>
                            )}
                    </div>
                ))}
                <div
                    key={-5}
                    className={`cursor-pointer relative text-4xl m-2 w-24 h-24 border-2 effect-black flex items-center justify-center active:transform active:scale-95`}
                    onClick={() => {
                        setCurrentCrop(null);
                    }}
                >
                    <i className=" fa  ">&#xf12d;</i>
                </div>
            </div>
        </>
    );
};
