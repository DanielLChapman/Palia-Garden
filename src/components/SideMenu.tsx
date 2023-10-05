import React from "react";

type SideMenuProps = {
    isOpen: boolean;
    onClose: () => void;
    menuPage: "Share" | "Settings" | "Mobile";
};

function SideMenu({ isOpen, onClose, menuPage }: SideMenuProps) {
    return (
        <>
            {isOpen && (
                <div
                    className={`bg-cyan-9 border-2 border-black fixed top-0 right-0 h-full transition-transform ease-in-out duration-300 transform ${
                        isOpen ? "translate-x-0" : "translate-x-full"
                    } w-full md:w-[400px] z-40`}
                >
                   
                </div>
            )}
        </>
    );
}

export default SideMenu;
