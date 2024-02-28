export const Navbar = () => {
    
    
    return (  
        <div  id="Navbar">
            <div class="topBarContainer">
                <button class="lineButton" id="gold">Gold</button>
                <button class="lineButton" id="red">Red</button>
                <button class="lineButton" id="blue">Blue</button>
                <button class="lineButton" id="green">Green</button>
            </div>
            <div class="divider"></div>
            <div class="topBarContainer">
                <h1>COLOR</h1>
            </div>
            <div class="divider"></div>
            <div id="bottomPart">
                <div id="leftSidebar">
                    <p id="selectYour">Select your starting station.</p>
                    <div id="locationButtonsContainer">
                        <button class="locationButton">All Stations</button>
                    </div>
                </div>
                <div id="directionBarAndDividerContainer">
                    <div id="directionBar" class="topBarContainer">
                        <button>Arriving</button>
                        <button>Scheduled</button>
                        <button>(North/East)bound</button>
                        <button>(South/West)bound</button>
                        
                    </div>
                    <div class="divider"></div>
                </div>
                
            </div>
        </div>
    );
}