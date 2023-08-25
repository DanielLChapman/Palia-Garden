import React from "react";

function Header() {
    return (
        <header className="flex items-center justify-between py-4 px-4 md:px-8">
            <h1 className="logo flex items-center font-serif font-bold text-2xl">
                Palia Garden Profit Planner
            </h1>
            <div className="hidden md:flex md:hidden justify-end space-x-4">
                <button className="bg-white px-4 py-2 rounded">Button 1</button>
                <button className="bg-white px-4 py-2 rounded">Button 2</button>
                <button className="bg-white px-4 py-2 rounded">Button 3</button>
            </div>
            <button className="hidden md:hidden px-4 py-2">
                {/* Simple Hamburger Icon (you can use any icon library or custom SVG) */}
                <div className="h-1 w-5 mb-1 bg-black"></div>
                <div className="h-1 w-5 mb-1 bg-black"></div>
                <div className="h-1 w-5 bg-black"></div>
            </button>
        </header>
    );
}
export default Header;
