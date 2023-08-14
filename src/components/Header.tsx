import React from "react";

function Header() {
    return (
        <header className="py-4">
            <div className="flex justify-end space-x-4">
                <button className="bg-white px-4 py-2 rounded">Button 1</button>
                <button className="bg-white px-4 py-2 rounded">Button 2</button>
                <button className="bg-white px-4 py-2 rounded">Button 3</button>
            </div>
        </header>
    );
}
export default Header;
