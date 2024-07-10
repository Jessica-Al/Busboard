import { Bus } from "./APIFunctions/busDataInterfaces";
import busRoutes from "./APIFunctions/busRoutes";

interface BusStopTableProps {
    buses: Bus[];
    setBusSelected: (bus: Bus) => void;
    setOrderedLineRouteBusStopNames: (orderedLineRouteBusStopNames: (string | null)[] | null) => void;
    busSelected: Bus | null;
}

const BusStopTable: React.FC<BusStopTableProps> = ({ buses, setBusSelected, setOrderedLineRouteBusStopNames, busSelected}) => {

    async function getStopNames(busSelected: Bus | null) : Promise<void> {
        setOrderedLineRouteBusStopNames((busSelected !== null) ? await busRoutes(busSelected) : []);
    }

    getStopNames(busSelected);

    return (
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
                {buses.map(item => {
                    return (
                        <tr key = {item.busNumber}
                        >
                            <td>
                                <button onClick = {() => setBusSelected(item)}>
                                {item.busNumber}
                                </button>
                            
                                </td>
                            <td>{item.busRoute}</td>
                            <td>{item.destination}</td>
                            <td>{item.minutesToArrival}</td>
                        </tr>
                    )
                }
                )}
            </tbody>
        </table>
    )
}

export default BusStopTable
