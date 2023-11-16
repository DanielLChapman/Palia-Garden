import React, { useState } from "react";
import { useSettings } from "./useSettings";
import { GridState, serialized, useGrid } from "./useGrid";
import { useGridContext } from "./GridContext/useGridContext";

type SideMenuProps = {
    isOpen: boolean;
    onClose: () => void;
    menuPage: "Share" | "Settings" | "Mobile";
    grid: GridState;
    setLocalGrid: (grid: GridState) => void;
    recheckLocalStorage: () => void;
    saveGridToLocalStorage: (value: GridState) => void;
};

function SideMenu({
    isOpen,
    onClose,
    menuPage,
    grid,
    setLocalGrid,
    recheckLocalStorage,
    saveGridToLocalStorage,
}: SideMenuProps) {
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);
    const [str, setStr] = useState("");

    const { checkString } = useGridContext();

    const {
        useStarSeeds,
        setUseStarSeeds,
        plantStarSeeds,
        setPlantStarSeeds,
        overTwentyFive,
        setOverTwentyFive,
        reinvestSeeds,
        setReinvestSeeds,
    } = useSettings();
    return (
        <>
            {isOpen && (
                <div
                    className={`bg-cyan-9 border-2 border-black fixed top-0 right-0 h-full transition-transform ease-in-out duration-300 transform ${
                        isOpen ? "translate-x-0" : "translate-x-full"
                    } w-full md:w-[400px] z-40`}
                >
                    <h2 className="pt-1 pl-8 mt-[1.35rem] text-2xl text-cyan-2">
                        {menuPage}
                    </h2>
                    <button
                        className={`hidden md:block px-4 py-2 fixed top-6 right-8 z-50`}
                        onClick={onClose}
                    >
                        <div
                            className={`h-1 w-5 mb-1 bg-black transition-all duration-300 ease-in-out transform ${
                                true ? "w-6 rotate-45 origin-top-left" : ""
                            }`}
                        ></div>
                        <div
                            className={`h-1 w-5 mb-1 bg-black transition-opacity duration-300 ease-in-out ${
                                true ? "opacity-0" : ""
                            }`}
                        ></div>
                        <div
                            className={`h-1 w-5 bg-black transition-all duration-300 ease-in-out transform ${
                                true ? "w-6 -rotate-45 origin-bottom-left" : ""
                            }`}
                        ></div>
                    </button>

                    {menuPage === "Settings" && (
                        <div className=" mt-4">
                            <ul className=" text-sm font-medium text-gray-900 border-gray-200 rounded-lg">
                                {[
                                    {
                                        label: "Gardening Over level 25",
                                        id: "overTwentyFive-checkbox",
                                        value: overTwentyFive,
                                        setter: setOverTwentyFive,
                                        description:
                                            "Sets gardening level to over 25 which greatly increases your chance of star crops.",
                                    },
                                    {
                                        label: "Reinvest in Seeds",
                                        id: "reinvestSeeds-checkbox",
                                        value: reinvestSeeds,
                                        setter: setReinvestSeeds,
                                        description:
                                            "Take out of total profit the cost of buying new seeds",
                                    },
                                    {
                                        label: "Plant Star Seeds",
                                        id: "plantStarSeeds-checkbox",
                                        value: plantStarSeeds,
                                        setter: setPlantStarSeeds,
                                        description:
                                            "Plants star crops using star seeds. Crafted star seeds are prioritized for planting over being sold.",
                                    },
                                    {
                                        label: "Use Starred Seeds",
                                        id: "useStarSeeds-checkbox",
                                        value: useStarSeeds,
                                        setter: setUseStarSeeds,
                                        description:
                                            "Prioritize using starred seeds for all plantings, both regular and starred, instead of selling them to buy normal seeds.",
                                    },
                                ].map(
                                    ({
                                        label,
                                        id,
                                        value,
                                        setter,
                                        description,
                                    }) => (
                                        <li
                                            key={id}
                                            className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600 relative"
                                            onMouseEnter={() =>
                                                setHoveredItem(id)
                                            }
                                            onMouseLeave={() =>
                                                setHoveredItem(null)
                                            }
                                        >
                                            <div className="flex items-center pl-6">
                                                <label
                                                    htmlFor={id}
                                                    className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                                >
                                                    {label}
                                                </label>
                                                <input
                                                    id={id}
                                                    type="checkbox"
                                                    className="w-4 h-4 text-blue-600 mr-14
                                            focus:ring-blue-600ring-offset-gray-700 focus:ring-offset-gray-700 focus:ring-2 bg-gray-600 border-gray-500"
                                                    checked={value}
                                                    onChange={() =>
                                                        setter(!value)
                                                    }
                                                />
                                            </div>
                                            {hoveredItem === id && (
                                                <div className="absolute left-6 top-full mt-2 p-2 w-56 text-sm bg-white border border-gray-300 rounded shadow-lg z-50">
                                                    {description}
                                                </div>
                                            )}
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                    )}

                    {menuPage === "Share" && (
                        <div className="mt-4">
                        <div className="flex justify-start space-x-2 ml-8  mb-4">
                            <button className="bg-cyan-500 text-white py-2 px-4 rounded hover:bg-cyan-600 focus:outline-none" onClick={() => saveGridToLocalStorage(grid)}>Save</button>
                            <button className="bg-cyan-500 text-white py-2 px-4 rounded hover:bg-cyan-600 focus:outline-none" onClick={recheckLocalStorage}>Load</button>
                        </div>
                    
                        <div className="p-4 border-2 border-gray-300 rounded-lg mb-4 shadow mx-8 ">
                            <div className="font-bold mb-2 text-cyan-500">Share This Grid</div>
                            <div className="bg-gray-100 p-2 rounded mb-2 cursor-pointer" onClick={() => navigator.clipboard.writeText(serialized(grid))}>
                                <div className="truncate text-gray-700 text-sm">Click to copy:</div>
                                <div className="text-blue-600 truncate">{serialized(grid)}</div>
                            </div>
                            <div className="bg-gray-100 p-2 rounded cursor-pointer" onClick={() => navigator.clipboard.writeText(`${window.location.href}${serialized(grid)}`)}>
                                <div className="truncate text-gray-700 text-sm ">Click to copy link:</div>
                                <div className="text-blue-600 truncate">{window.location.href}{serialized(grid)}</div>
                            </div>
                        </div>
                    
                        <div className="p-4 border-2 border-gray-300 rounded-lg shadow mx-8">
                            <div className="font-bold mb-2 text-cyan-500">Load Grid</div>
                            <div className="flex items-center space-x-2">
                                <input type="text" value={str} onChange={(e) => setStr(e.target.value)} className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
                                <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none" onClick={() => checkString(str)}>Load</button>
                            </div>
                        </div>
                    </div>
                    
                    )}
                </div>
            )}
        </>
    );
}

export default SideMenu;
