import React, { useContext, useEffect } from 'react';
import { Context } from "./LinesPage";

export const Navbar = () => {
    const [currentColor, setCurrentColor] = useContext(Context);

    useEffect(() => {
        console.log('Current Color: ' + currentColor);
    }, [currentColor])

    return ((
        <div  id="Navbar">
            <div className="topBarContainer">
                <button className="lineButton" id="gold" onClick={() => {setCurrentColor("gold")}}>Gold</button>
                <button className="lineButton" id="red" onClick={() => setCurrentColor("red")}>Red</button>
                <button className="lineButton" id="blue" onClick={() => setCurrentColor("blue")}>Blue</button>
                <button className="lineButton" id="green" onClick={() => setCurrentColor("green")}>Green</button>
            </div>
            <div className="divider"></div>
            <div className="topBarContainer">
                <h1>{currentColor.toUpperCase()}</h1>
            </div>
            <div className="divider"></div>
            
        </div>
    ));
}