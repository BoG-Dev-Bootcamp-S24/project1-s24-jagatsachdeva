import { Navbar } from './Navbar';
import { TrainList } from './TrainList';
import React, { useState } from 'react';


export const Context = React.createContext();
export const LinesPage = () => {
    
    const [currentColor, setCurrentColor] = useState("gold");

    return ( 
        <div id="LinesPage">
            <Context.Provider value={[currentColor, setCurrentColor]}>
                <Navbar />
                <TrainList/>
            </Context.Provider>
        </div>
    );
}