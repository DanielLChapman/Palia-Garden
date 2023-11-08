import React from "react";
import { GridState } from "./useGrid";

type HeaderProps = {
    onMenuToggle: React.Dispatch<
        React.SetStateAction<boolean>
    >;
    setMenuPage: React.Dispatch<
        React.SetStateAction<"Share" | "Settings" | "Mobile">
    >;
    isOpen: boolean;
    
};

function Header({
    onMenuToggle,
    setMenuPage,
    isOpen,
    
}: HeaderProps) {
    return (
        <header className="flex items-center justify-between py-4 px-4 md:px-8 z-50">
            <h1 className="logo flex items-center font-montserrat text-gray-100 font-bold text-2xl ">
                Palia Garden Profit Planner
            </h1>
            <div className="hidden md:flex justify-end space-x-4">
                <button
                    onClick={() => {
                        onMenuToggle(true);
                        setMenuPage("Share");
                    }}
                    className="border-2 border-cyan-7 text-gray-100 px-4 py-2 rounded hover:bg-cyan-6 transition duration-200"
                >
                    Save / Load / Share
                </button>
                <button
                    onClick={() => {
                        onMenuToggle(true);
                        setMenuPage("Settings");
                    }}
                    className="border-2 border-cyan-7 text-gray-100 px-4 py-2 rounded hover:bg-cyan-6 transition duration-200"
                >
                    Settings
                </button>
            </div>
        </header>
    );
}
export default Header;
