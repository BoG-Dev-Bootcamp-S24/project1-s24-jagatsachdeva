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
        fetch(`https://midsem-bootcamp-api.onrender.com/stations/${currentColor}`)
            .then(res => res.json())
            .then((stations) => {
                setStations(stations);
            });
    }, [currentColor])

    // fetch for data
    useEffect(() => {
        fetch(`https://midsem-bootcamp-api.onrender.com/arrivals/${currentColor}`)
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

    const renderTrains = () => {
        // filters: starting station, direction
        let directionFilter = false;
        let delayFilter = false;
        let updatingFilteredData = [];
    
        if (currentFilter === "Arriving" || currentFilter === "Scheduled") {
            delayFilter = true;
        } else if (currentFilter === "Northbound" || currentFilter === "Southbound" || currentFilter === "Eastbound" || currentFilter === "Westbound") {
            directionFilter = true;
        }
    
        let filteredData = data.filter(currentTrain => {
            let returnDirectionValue;
            let returnStationValue;
            let nonDuplicate = true;
            if (delayFilter) {
                if (currentFilter === "Arriving") {
                    returnDirectionValue = currentTrain.DELAY === "T0S";
                } else if (currentFilter === "Scheduled") {
                    returnDirectionValue = currentTrain.DELAY !== "T0S";
                }
            } else if (directionFilter) {
                if (currentColor === "gold" || currentColor === "red") {
                    if (currentFilter === "Northbound") {
                        returnDirectionValue = currentTrain.DIRECTION === "N";
                    } else if (currentFilter === "Southbound") {
                        returnDirectionValue = currentTrain.DIRECTION === "S";
                    }
                } else if (currentColor === "blue" || currentColor === "green") {
                    if (currentFilter === "Eastbound") {
                        returnDirectionValue = currentTrain.DIRECTION === "E";
                    } else if (currentFilter === "Westbound") {
                        returnDirectionValue = currentTrain.DIRECTION === "W";
                    }
                }
            }

            updatingFilteredData.forEach(currentFilteredTrain => {
                let comparingWaitingTime;
                if (currentTrain.WAITING_TIME === "Arriving") {
                    if (currentFilteredTrain.WAITING_TIME === "Arriving") {
                        comparingWaitingTime = true;
                    }
                } else if (Math.abs(parseInt(currentFilteredTrain.WAITING_TIME.split()[0]) - parseInt(currentTrain.WAITING_TIME.split()[0])) <= 5) {
                    comparingWaitingTime = true;
                }
                if (comparingWaitingTime && currentFilteredTrain.STATION === currentTrain.STATION) {
                    nonDuplicate = false;
                }
            })
            
            if (currentStationFilter !== "All Stations") {
                if (currentStationFilter === "Lakewood/Ft. McPherson") {
                    returnStationValue = currentTrain.STATION === "LAKEWOOD STATION";
                } else if (currentStationFilter === "Hamilton E. Holmes") {
                    returnStationValue = currentTrain.STATION === "HE HOLMES STATION";
                } else {
                    returnStationValue = currentTrain.STATION === (currentStationFilter.toUpperCase() + " STATION");
                }
            } else {
                returnStationValue = true;
            }
            // console.log("returnDirectionValue:");
            // console.log(returnDirectionValue);
            // // console.log("returnDelayValue");
            // // console.log(returnDelayValue);
            // console.log("returnStationValue:");
            // console.log(returnStationValue);
            if (returnDirectionValue && returnStationValue) {
                updatingFilteredData.push(currentTrain);
            }
            return returnDirectionValue && returnStationValue && nonDuplicate;
        });

        if (filteredData.length === 0) {
            return (<div id="loading"><p>There are no trains to display.</p></div>)
        }

        console.log("filteredData:")
        console.log(filteredData);
    
        return (
            filteredData.map((currentTrain, index) => (
                <div key={index} className="train">
                    <div className="logo"></div>
                    <div className="infoBox">
                        <div className="destination">
                            <p><span className="destinationText">{currentTrain.STATION}</span> <span>&#8594;</span> <span className="destinationText">{currentTrain.DESTINATION}</span></p>
                        </div>
                        <div className="details">
                        <button className="tag lineColorTag" style={{
                            backgroundColor: (() => {
                                if (currentColor === "gold") {
                                return "rgb(255, 215, 0)";
                                } else if (currentColor === "red") {
                                return "rgb(228, 78, 78)";
                                } else if (currentColor === "blue") {
                                return "rgb(81, 81, 249)";
                                } else if (currentColor === "green") {
                                return "rgb(54, 151, 54)";
                                }
                            })()
                            }}>
                            {currentColor.toUpperCase()}
                        </button>
                            <button className="tag delayedTag" style={{
                            backgroundColor: (() => {
                                if (currentTrain.DELAY === "T0S") {
                                    return "rgb(149, 227, 149)";
                                } else {
                                    return "rgb(244, 141, 129)";
                                } 
                            })()
                            }}>
                                {(() => {
                                    if (currentTrain.DELAY === "T0S") {
                                        return "ON TIME";
                                    } else {
                                    return "DELAYED";
                                    }
                                })()}
                            </button>
                            <button className="tag timeTag">{(currentTrain.WAITING_TIME).toUpperCase()}</button>
                        </div>
                    </div>
                </div>
            ))
        );
    }

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
                        {renderTrains()}
                    </div>}
                    {isPending && <div id="loading"><p>Loading trains...</p></div>}
                </div>
            </div>
    );
}