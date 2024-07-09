import { Bus } from "./busDataInterfaces";

interface BusStopTableProps {
    buses: Bus[];
}

const BusStopTable: React.FC<BusStopTableProps> = ({ buses }) => {
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
    )
}

export default BusStopTable
