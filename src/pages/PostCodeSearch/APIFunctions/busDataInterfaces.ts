export interface Bus {
    busNumber: number;
    busRoute: string;
    destination: string;
    minutesToArrival: number;
}

export interface BusStop {
    stopName: string;
    buses: Bus[];
}
