import React from "react";

import { Crop, crops } from "@/data/crops";
import { effectToBorderClassMap } from "./GridCell";
import { Effect } from "../Effects";

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSeedling } from '@fortawesome/free-solid-svg-icons'
import { Fertilizer, fertilizers } from "@/data/fertilizer";

type FertilizerTableProps = {
    currentFertilizer: Fertilizer | null;
    setCurrentFertilizer: React.Dispatch<React.SetStateAction<Fertilizer | null>>;
    setDisplayTable: React.Dispatch<React.SetStateAction<'Crops'|'Fertilizer'>>;
};

export const FertilizerTable: React.FC<FertilizerTableProps> = ({
    currentFertilizer,
    setCurrentFertilizer,
    setDisplayTable
}) => {
    if (!crops) return <span>Please Refresh, something went wrong</span>;

    const getEffectBorder = (effect: Effect): string | null => {
        return effectToBorderClassMap[effect] || "effect-black";
    };
    return (
        <>
        
            <div className="flex flex-wrap justify-center ">
                {Object.keys(fertilizers).map((fertilizer, index) => (
                    <div
                        key={index}
                        className={`relative m-2 w-[75px] h-[75px] border-2 ${getEffectBorder(
                            fertilizers[fertilizer].gardenBuff
                        )} shadow-[0_0px_0px_1.5px_rgba(0,0,0,.6)] flex items-center justify-center cursor-pointer active:transform rounded-md active:scale-95 ${
                            currentFertilizer && fertilizers[fertilizer].name === currentFertilizer.name
                                ? "selected"
                                : ""
                        }`}
                        onClick={() => {
                            if (currentFertilizer?.name === fertilizers[fertilizer].name) {
                                return;
                            }
                            setCurrentFertilizer(fertilizers[fertilizer]);
                        }}
                    >
                        <Image
                            src={fertilizers[fertilizer].image}
                            alt={fertilizers[fertilizer].name}
                            width={32}
                            height={32}
                            className="icon-for-shadows"
                        />
                        
                    </div>
                ))}
                <div
                    key={-5}
                    className={`${!currentFertilizer ? 'selected' : ''} cursor-pointer shadow-[0_0px_0px_1.5px_rgba(0,0,0,.6)] relative text-4xl m-2  w-[75px] h-[75px] border-2 rounded-md effect-black flex items-center justify-center active:transform active:scale-95`}
                    onClick={() => {
                        setCurrentFertilizer(null);
                    }}
                >
                    <i className=" fa icon-for-shadows  ">&#xf12d;</i>
                </div>
                <div
                    key={-6}
                    className={`cursor-pointer shadow-[0_0px_0px_1.5px_rgba(0,0,0,.6)] relative text-4xl m-2  w-[75px] h-[75px] border-2 border-amber-600 rounded-md  flex items-center justify-center active:transform active:scale-95`}
                    onClick={() => {
                        setDisplayTable('Crops');
                        setCurrentFertilizer(null);
                    }}
                >
                    <FontAwesomeIcon icon={faSeedling} className="icon-for-shadows text-amber-600" />
                </div>
            </div>
        </>
    );
};
