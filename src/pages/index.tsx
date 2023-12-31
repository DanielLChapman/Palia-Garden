import App from "@/components/App";
import Footer from "@/components/Footer";
import { useGridContext } from "@/components/GridContext/useGridContext";
import Header from "@/components/Header";
import SideMenu from "@/components/SideMenu";
import { GridState, useGrid } from "@/components/useGrid";
import { useEffect, useState } from "react";

export default function Home({}) {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [menuPage, setMenuPage] = useState<"Share" | "Settings" | "Mobile">(
        "Share"
    );
    const {grid, updateGrid, saveGrid, loadGrid, gridCounts} = useGridContext();

    /*
    const {
        grid: initialState,
        setGrid: setLocalGrid,
        recheckLocalStorage,
        saveGridToLocalStorage,
    } = useGrid();

    const [grid, setGrid] = useState<GridState >(initialState);*/
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (grid) {
            setIsLoading(false);
        }
    }, [grid]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-[1500px] mx-auto py-2 px-6 relative">
            <Header
                onMenuToggle={() => setMenuOpen(true)}
                setMenuPage={setMenuPage}
                isOpen={isMenuOpen}
            />
            <App  gridCounts={gridCounts} />
            <Footer />
            <SideMenu
                isOpen={isMenuOpen}
                onClose={() => setMenuOpen(false)}
                menuPage={menuPage}
                grid={grid}
                setLocalGrid={updateGrid}
                saveGridToLocalStorage={saveGrid}
                recheckLocalStorage={loadGrid}
            />

            {/* Hamburger/X button */}
            <button
                className={`block md:hidden px-4 py-2 absolute top-6 right-8 z-50`}
                onClick={() => setMenuOpen(!isMenuOpen)}
            >
                <div
                    className={`h-1 w-5 mb-1 bg-black transition-all duration-300 ease-in-out transform ${
                        isMenuOpen ? "w-6 rotate-45 origin-top-left" : ""
                    }`}
                ></div>
                <div
                    className={`h-1 w-5 mb-1 bg-black transition-opacity duration-300 ease-in-out ${
                        isMenuOpen ? "opacity-0" : ""
                    }`}
                ></div>
                <div
                    className={`h-1 w-5 bg-black transition-all duration-300 ease-in-out transform ${
                        isMenuOpen ? "w-6 -rotate-45 origin-bottom-left" : ""
                    }`}
                ></div>
            </button>
        </div>
    );
}
