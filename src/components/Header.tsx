import React from "react";

function Header() {
    return (
        <header className="flex items-center justify-between py-4 px-4 md:px-8">
            <h1 className="logo flex items-center font-montserrat text-gray-100 font-bold text-2xl ">
                Palia Garden Profit Planner
            </h1>
            <div className="hidden md:flex justify-end space-x-4">
                <button className="border-2 border-cyan-7 text-gray-100 px-4 py-2 rounded hover:bg-cyan-6 transition duration-200">
                    Save / Load
                </button>
                <button className="border-2 border-cyan-7 text-gray-100 px-4 py-2 rounded hover:bg-cyan-6 transition duration-200">
                    Share
                </button>
                <button className="border-2 border-cyan-7 text-gray-100 px-4 py-2 rounded hover:bg-cyan-6 transition duration-200">
                    Settings
                </button>
            </div>

            <button className="block md:hidden px-4 py-2">
                {/* Simple Hamburger Icon (you can use any icon library or custom SVG) */}
                <div className="h-1 w-5 mb-1 bg-black"></div>
                <div className="h-1 w-5 mb-1 bg-black"></div>
                <div className="h-1 w-5 bg-black"></div>
            </button>
        </header>
    );
}
export default Header;
