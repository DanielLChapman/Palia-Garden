import React from "react";
import { useSettings } from "./useSettings";

type SideMenuProps = {
    isOpen: boolean;
    onClose: () => void;
    menuPage: "Share" | "Settings" | "Mobile";
};

function SideMenu({ isOpen, onClose, menuPage }: SideMenuProps) {
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

                    <div className="space-y-4 mt-14">
                        {[
                            {
                                label: "Plant Star Seeds",
                                value: plantStarSeeds,
                                setter: setPlantStarSeeds,
                            },
                            {
                                label: "Gardening Over level 25",
                                value: overTwentyFive,
                                setter: setOverTwentyFive,
                            },
                            {
                                label: "Use Starred Seeds",
                                value: useStarSeeds,
                                setter: setUseStarSeeds,
                            },
                            {
                                label: "Reinvest in Seeds",
                                value: reinvestSeeds,
                                setter: setReinvestSeeds,
                            },
                        ].map(({ label, value, setter }) => (
                            <label
                                key={label}
                                className="flex items-center space-x-2 border-2 border-white p-2 rounded-md shadow-sm hover:bg-gray-100 transition duration-200"
                            >
                                <input
                                    type="checkbox"
                                    className="form-checkbox h-5 w-5 text-blue-600 rounded-md"
                                    checked={value}
                                    onChange={() => setter(!value)}
                                />
                                <span className="text-gray-900 font-medium">
                                    {label}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}

export default SideMenu;
