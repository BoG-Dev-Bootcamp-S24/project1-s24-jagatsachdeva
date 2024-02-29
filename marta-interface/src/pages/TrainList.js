import React, { useState, useContext, useEffect } from 'react';
import { Context } from "./LinesPage"

export const TrainList = () => {
    const [currentColor, setCurrentColor] = useContext(Context);
    const [data, setData] = useState(null);
    const [currentFilter, setCurrentFilter] = useState("Arriving");
    const [boundButtons, setBoundButtons] = useState(["Northbound", "Southbound"]);
    const [currentStationFilter, setCurrentStationFilter] = useState("All Stations");


    const [isPending, setIsPending] = useState(true);
    const goldLineStations = ["Doraville", "Chamblee", "Brookhaven", "Lenox", "Lindbergh Center", "Arts Center",
    "Midtown", "North Avenue", "Civic Center", "Peachtree Center", "Five Points", "Garnett", "West End", 
    "Lakewood", "East Point", "College Park", "Airport"];
    const redLineStations = ["North Springs", "Sandy Springs", "Dunwoody", "Medical Center", "Buckhead", "Arts Center",
    "Midtown", "North Avenue", "Civic Center", "Peachtree Center", "Five Points", "Garnett", "West End", 
    "Lakewood", "East Point", "College Park", "Airport"];
    const blueLineStations = ["Hamilton E. Holmes", "West Lake", "Ashby", "Vine City", "GWCC/CNN Center", "Five Points", "Georgia State", 
    "King Memorial", "Inman Park", "Edgewood", "East Lake", "Decatur", "Avondale", "Kensington", "Indian"];
    const greenLineStations = ["Bankhead", "Ashby", "Vine City", "GWCC/CNN Center", "Five Points", "Georgia State", 
    "King Memorial", "Inman Park", "Edgewood"];

    useEffect(() => {
        fetch("https://midsem-bootcamp-api.onrender.com/arrivals/" + currentColor.toUpperCase())
            .then(res => res.json())
            .then((data) => {
                setData(data);
                setIsPending(false);
            });
    }, [currentColor]);

    useEffect(() => {
        if (currentColor === "red" || currentColor === "gold") {
            setBoundButtons(["Northbound", "Southbound"]);
        } else if (currentColor === "green" || currentColor === "blue") {
            setBoundButtons(["Eastbound", "Westbound"]);
        }
    }, [currentColor]);

    useEffect(() => {
        console.log("Directions: " + boundButtons);
    }, [boundButtons]);

    useEffect(() => {
        console.log(currentFilter);
    }, [currentFilter]);

    useEffect(() => {
        console.log("Current Station: " + currentStationFilter);
    }, [currentStationFilter]);


    const renderStations = () => {
        let array;
        if (currentColor === "red") {
            array = redLineStations;
        } else if (currentColor === "gold") {
            array = goldLineStations; 
        } else if (currentColor === "blue") {
            array = blueLineStations;
        } else if (currentColor === "green") {
            array = greenLineStations;
        }
        return (array.map(currentStation => (
            <button className="locationButton" key={currentStation} onClick={() => {setCurrentStationFilter(currentStation)}}>{currentStation}</button>)
        ))
    }

    const determineButtonName = (currentColor, first) => {
        let buttonName;
        if ((currentColor === "red" || currentColor === "gold") && first) {
            buttonName="Northbound";
        } else if((currentColor === "red" || currentColor === "gold") && !first) {
            buttonName="Southbound";
        } else if((currentColor === "blue" || currentColor === "green") && first) {
            buttonName="Eastbound";
        } else if((currentColor === "blue" || currentColor === "green") && !first) {
            buttonName="Westbound";
        }
        return (buttonName);
    }

    return (
        <div  id="TrainList">
                <div id="leftSidebar">
                    <p id="selectYour">Select your starting station.</p>
                    <div id="locationButtonsContainer">
                        <button className="locationButton">All Stations</button>
                        {renderStations()} 
                    </div>
                </div>
                <div id="directionBarAndDividerContainer">
                    <div id="directionBar" class="topBarContainer">
                        <button onClick={() => {setCurrentFilter("Arriving")}}>Arriving</button>
                        <button onClick={() => {setCurrentFilter("Scheduled")}}>Scheduled</button>
                        <button onClick={() => {setCurrentFilter(boundButtons[0])}}>{determineButtonName(currentColor, true)}</button>
                        <button onClick={() => {setCurrentFilter(boundButtons[1])}}>{determineButtonName(currentColor, false)}</button>
                    </div>
                    <div class="divider"></div>
                    {!isPending && <div id="dataBox"></div>}
                    {isPending && <div id="loading"><p>Loading...</p></div>}
                </div>
            </div>
    );
}