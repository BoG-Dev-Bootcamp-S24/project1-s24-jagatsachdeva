import { Navbar } from './Navbar';
import { TrainList } from './TrainList';
import { useFetch } from './../useFetch';

export const LinesPage = () => {
    
    return ( 
        <div id="LinesPage">
            <Navbar/>
            <TrainList/>
        </div>
    );
}