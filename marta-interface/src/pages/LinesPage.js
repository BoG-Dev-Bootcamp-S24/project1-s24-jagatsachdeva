import { Navbar } from './Navbar';
import { TrainList } from './TrainList';
import { useFetch } from './../useFetch';
import React, { useState } from 'react';


export const Context = React.createContext();
export const LinesPage = () => {
    
    const [currentColor, setCurrentColor] = useState("gold");
    const data = useFetch();

    

    return ( 
        <div id="LinesPage">
            <Context.Provider value={[currentColor, setCurrentColor]}>
                <Navbar />
                <TrainList data={data}/>
            </Context.Provider>
        </div>
    );
}