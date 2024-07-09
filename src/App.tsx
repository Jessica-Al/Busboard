import React, {useState} from 'react';
import busArrivals from './busArrivals';
import {Bus, BusStop} from './busDataInterfaces'



async function getBuses(postcode: string): Promise<BusStop[]> {
    return await busArrivals(postcode);
}

function App(): React.ReactElement {

    const [postcode, setPostcode] = useState<string>("");
    const [busStopList, setBusStopList] = useState<BusStop[]>([]);
    let counter: number = -1;

    async function formHandler(event: React.FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault(); // to stop the form refreshing the page when it submits
        setBusStopList(await getBuses(postcode));
    }

    function updatePostcode(data: React.ChangeEvent<HTMLInputElement>): void {
        setPostcode(data.target.value)
    }

    function makeBusStopTable() {
        return <>
        <table>
                <thead>
                    <tr>
                        <th>number</th>
                        <th>route</th>
                        <th>destination</th>
                        <th>minutes to arrival</th>
                    </tr>
                </thead>
                <tbody>
                    {busStopList[counter].buses.map(item => {
                        return (
                            <tr key = {item.busNumber}>
                                <td>{item.busNumber}</td>
                                <td>{item.busRoute}</td>
                                <td>{item.destination}</td>
                                <td>{item.minutesToArrival}</td>
                            </tr>
                        )
                    }
                    )}
                </tbody>
            </table>
        </>
    }

    return <>
        <h1> BusBoard </h1>
        <form action="" onSubmit={formHandler}>
            <label htmlFor="postcodeInput"> Postcode: </label>
            <input type="text" id="postcodeInput" onChange={updatePostcode}/>
            <input type="submit" value="Submit"/>
        </form>
        
        {busStopList.map(item => {
            counter += 1
            return (
                <>
                <h2>{item.stopName}</h2>
                {makeBusStopTable()}
                
                </>
            )
            
        })}
        
    </>;
}
{}


export default App;