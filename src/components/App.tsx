import React, { useState } from "react";
import { useGrid } from "./useGrid";
import Header from "./Header";
import Footer from "./Footer";
import Grid from "./Grid/Grid";

function App({}) {
    const initialState = useGrid();
    const [grid, setGrid] = useState(initialState);

    return (
        <main className=" py-6 px-4 mt-4 border-red-800 border-2 ">
            {/* grid */}
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <div className="flex-1 bg-gray-300 p-4">
                    <Grid grid={grid} setGrid={setGrid} />
                </div>
                <div className="flex-1 bg-gray-400 p-4">right</div>
            </div>
        </main>
    );
}

export default App;
