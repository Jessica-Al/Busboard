interface OrderedStopNames {
    orderedLineRouteBusStopNames : (string | null)[] | null
}

const BusRouteTable : React.FC <OrderedStopNames> = ({ orderedLineRouteBusStopNames }) => {
    return (
        <>
        <h2>Bus Route</h2>
        <ol>
        {orderedLineRouteBusStopNames?.map(item => {
            return <li>{item}</li>
        })}
        </ol>
        </>
    )
}

export default BusRouteTable