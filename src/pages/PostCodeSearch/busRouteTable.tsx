import busRoutes from "./APIFunctions/busRoutes";

interface OrderedStopNames {
    orderedLineRouteBusStopNames : string[] | null
}

const BusRouteTable : React.FC <OrderedStopNames> = ({ orderedLineRouteBusStopNames }) => {
    return (
        <>
        <h2>Bus Route</h2>
        {orderedLineRouteBusStopNames?.map(item => {
            return <li>item</li>
        })}
        </>
    )
}

export default BusRouteTable