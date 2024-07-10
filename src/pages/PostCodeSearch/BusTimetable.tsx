import React, {useState} from 'react';
import busArrivals from './APIFunctions/busArrivals';
import {BusStop, Bus} from './APIFunctions/busDataInterfaces'
import BusStopTable from './busStops';
import BusRouteTable from './busRouteTable';
import busRoutes from './APIFunctions/busRoutes';


async function getBuses(postcode: string): Promise<BusStop[]> {
    return await busArrivals(postcode);
}


function BusTimetable(): React.ReactElement {
    const [postcode, setPostcode] = useState<string>("");
    const [busStopList, setBusStopList] = useState<BusStop[]>([]);

    const [busSelected, setBusSelected] = useState<Bus | null>(null);
    const [orderedLineRouteBusStopNames, setOrderedLineRouteBusStopNames] = useState<(string | null)[] | null>([])

    async function formHandler(event: React.FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault(); // to stop the form refreshing the page when it submits
        setBusStopList(await getBuses(postcode));
    }

    function updatePostcode(data: React.ChangeEvent<HTMLInputElement>): void {
        setPostcode(data.target.value)
    }



    return (
    <>
        <h1> BusBoard </h1>
        <form action="" onSubmit={formHandler}>
            <label htmlFor="postcodeInput"> Postcode: </label>
            <input type="text" id="postcodeInput" onChange={updatePostcode}/>
            <input type="submit" value="Submit"/>
        </form>
        
        {busStopList.map(item =>  (
                <>
                    <h2>{item.stopName}</h2>
                    <BusStopTable buses={item.buses} setBusSelected={setBusSelected} setOrderedLineRouteBusStopNames={setOrderedLineRouteBusStopNames} busSelected={busSelected}/>
                    
                </>
            )
        )}
        {<BusRouteTable orderedLineRouteBusStopNames = {orderedLineRouteBusStopNames}/>}
    </>
    )
}



export default BusTimetable;