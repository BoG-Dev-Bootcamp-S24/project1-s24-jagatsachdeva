import React, { useState, useContext, useEffect } from 'react';
import { Context } from "./LinesPage"

export const TrainList = () => {
    const [currentColor, setCurrentColor] = useContext(Context);
    const [data, setData] = useState(null);
    const [stations, setStations] = useState(null)
    const [currentFilter, setCurrentFilter] = useState("Arriving");
    const [boundButtons, setBoundButtons] = useState(["Northbound", "Southbound"]);
    const [currentStationFilter, setCurrentStationFilter] = useState("All Stations");
    const [isPending, setIsPending] = useState(true);


    // fetch for stations
    useEffect(() => {
        fetch(`https://midsem-bootcamp-api.onrender.com/stations/${currentColor.toUpperCase()}`)
            .then(res => res.json())
            .then((stations) => {
                setStations(stations);
            });
    }, [currentColor])

    // fetch for data
    useEffect(() => {
        fetch(`https://midsem-bootcamp-api.onrender.com/arrivals/${currentColor.toUpperCase()}`)
            .then(res => res.json())
            .then((data) => {
                setData(data);
                setIsPending(false);
            });
    }, [currentColor]);

    useEffect(() => {
        console.log(data);
    },[data])

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
        if (!stations) {
            return <p className="locationButton">Loading stations...</p>;
        }

        return (stations.map(currentStation => (
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

    // const renderTrains = () => {
    //     // filters: starting station, direction
    //     let directionFilter = false;
    //     let delayFilter = false;

    //     if (currentFilter === "Arriving" || currentFilter === "Scheduled") {
    //         delayFilter = true;
    //     } else if (currentFilter === "Northbound" || currentFilter === "Southbound" || currentFilter === "Eastbound" || currentFilter === "Westbound") {
    //         directionFilter = true;
    //     } 

    //     filteredData = data.filter(currentTrain => {
    //         let returnDirectionValue;
    //         let returnStationValue;
    //         if (delayFilter) {
    //             currentFilter === "Arriving" ? returnDirectionValue = currentTrain.DELAY === "TOS" : returnDirectionValue = currentTrain.DELAY !== "TOS";
    //         } else if (directionFilter) {
    //             if (currentColor === "gold" || currentColor === "red") {
    //                 currentFilter === "Northbound" ? returnDirectionValue = currentTrain.DIRECTION === "N" : returnDirectionValue = currentTrain.DIRECTION !== "S";
    //             } else {
    //                 currentFilter === "Eastbound" ? returnDirectionValue = currentTrain.DIRECTION === "E" : returnDirectionValue = currentTrain.DIRECTION !== "W";
    //             }
    //         }
    //         currentStationFilter !== "All Stations" ? returnStationValue = currentTrain.STATION === currentStationFilter.toUpperCase : returnStationValue = true;
    //         return returnDirectionValue && returnStationValue;
    //     })

    //     return (

    //     )
        
    // }

    return (
        <div  id="TrainList">
                <div id="leftSidebar">
                    <p id="selectYour">Select your starting station.</p>
                    <div id="locationButtonsContainer">
                        <button className="locationButton" onClick={() => {setCurrentStationFilter("All Stations")}}>All Stations</button>
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
                    {!isPending && <div id="dataBox">
                        <div className="train">
                            <div className="logo"></div>
                            <div className="infoBox">
                                <div className="destination">
                                    <p><span className="destinationText">Brookhaven Station</span> <span>&#8594;</span> <span className="destinationText">Doraville</span></p>
                                </div>
                                <div className="details">
                                    <button className="tag lineColorTag">Gold</button>
                                    <button className="tag delayedTag">Delayed</button>
                                    <button className="tag timeTag">20 min</button>
                                </div>
                            </div>
                        </div>
                        <div className="train">
                            <div className="logo"></div>
                            <div className="infoBox">
                                <div className="destination">
                                    <p><span className="destinationText">Brookhaven Station</span> <span>&#8594;</span> <span className="destinationText">Doraville</span></p>
                                </div>
                                <div className="details">
                                    <button className="tag lineColorTag">Gold</button>
                                    <button className="tag delayedTag">Delayed</button>
                                    <button className="tag timeTag">20 min</button>
                                </div>
                            </div>
                        </div>
                        <div className="train">
                            <div className="logo"></div>
                            <div className="infoBox">
                                <div className="destination">
                                    <p><span className="destinationText">Brookhaven Station</span> <span>&#8594;</span> <span className="destinationText">Doraville</span></p>
                                </div>
                                <div className="details">
                                    <button className="tag lineColorTag">Gold</button>
                                    <button className="tag delayedTag">Delayed</button>
                                    <button className="tag timeTag">20 min</button>
                                </div>
                            </div>
                        </div>
                        <div className="train">
                            <div className="logo"></div>
                            <div className="infoBox">
                                <div className="destination">
                                    <p><span className="destinationText">Brookhaven Station</span> <span>&#8594;</span> <span className="destinationText">Doraville</span></p>
                                </div>
                                <div className="details">
                                    <button className="tag lineColorTag">Gold</button>
                                    <button className="tag delayedTag">Delayed</button>
                                    <button className="tag timeTag">20 min</button>
                                </div>
                            </div>
                        </div>
                        <div className="train">
                            <div className="logo"></div>
                            <div className="infoBox">
                                <div className="destination">
                                    <p><span className="destinationText">Brookhaven Station</span> <span className="arrow">&#8594;</span> <span className="destinationText">Doraville</span></p>
                                </div>
                                <div className="details">
                                    <button className="tag lineColorTag">Gold</button>
                                    <button className="tag delayedTag">Delayed</button>
                                    <button className="tag timeTag">20 min</button>
                                </div>
                            </div>
                        </div>
                    </div>}
                    {isPending && <div id="loading"><p>Loading trains...</p></div>}
                </div>
            </div>
    );
}