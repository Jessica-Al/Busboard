import { Bus } from "./busDataInterfaces";

interface BusRoute {
    stopPointSequences : StopPointSequence[];
    orderedLineRoutes : Route[];
}

interface StopPointSequence {
    stopPoint : BusStation[]
}

interface BusStation {
    id : string;
    name : string;
}

interface Route {
    naptanIds : string[];
}

export default async function busRoutes(bus: Bus): Promise<(string)[] | null> {

    const routeId = bus.busRoute;
    const directionIsInbound = bus.directionIsInbound;

    const direction = (directionIsInbound) ? 'inbound' : 'outbound';

    const fetchBusRouteInfo = async (routeId : string, direction : string) : Promise<BusRoute | null> => {
        try {
        console.log(routeId);
        console.log(direction);
        const response = await fetch(`https://api.tfl.gov.uk/Line/${routeId}/Route/Sequence/${direction}`);
        return await response.json() as BusRoute;
        } catch (error: any) {
        console.error(error);
        return null;
        } finally {
        console.log("Request complete");
        }
    }

    const busRoute = await fetchBusRouteInfo(routeId, direction);

    if (busRoute == null) {
        return null
    } else {
        const orderedLineRouteIds = busRoute.orderedLineRoutes[0];
        const orderedLineRouteBusStopNames : (string)[] = [];

        for (let routeID of orderedLineRouteIds.naptanIds) {
            const bus = busRoute.stopPointSequences[0].stopPoint.find(o => o.id == routeID);
            (bus == undefined) ? orderedLineRouteBusStopNames.push('') : orderedLineRouteBusStopNames.push(bus?.name);
        }

        
        return orderedLineRouteBusStopNames;
    }
}