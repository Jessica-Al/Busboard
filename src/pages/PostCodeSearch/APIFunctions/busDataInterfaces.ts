export interface Bus {
    busNumber: number;
    busRoute: string;
    destination: string;
    minutesToArrival: number;
    directionIsInbound: boolean;
}

export interface BusStop {
    stopName: string;
    buses: Bus[];
}
