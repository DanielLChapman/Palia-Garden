import React from 'react';
import { useGrid } from './Grid';

function App({}) {

    const grid = useGrid();

    console.log(grid);

    return (
        <div>
            Hello!
        </div>
    );
}

export default App;