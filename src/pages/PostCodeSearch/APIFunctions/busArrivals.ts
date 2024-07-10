import {Bus, BusStop} from './busDataInterfaces'

interface PostcodeResponseType {
  result: {
    longitude: number;
    latitude: number;
  }
}

interface TFLStopPointPropertiesResponseType {
  timeToStation: number;
  lineId: string;
  destinationName: string;
  stationName: string;
  direction: string;
}

interface TFLStopPointResponseType {
  lineGroup: TFLLineGroup[];
}

interface TFLLineGroup {
  naptanIdReference: string;
}

interface TFLStopPointsfromLongLatResponseType {
  stopPoints: TFLStopPointResponseType[];
}

export default async function busArrivals(inputPostcode: string): Promise<BusStop[]> {

  const getLongLat = async (inputPostcode: string) : Promise<number[]> => {

    try {
      const response = await fetch(`https://api.postcodes.io/postcodes/${inputPostcode}`);
      const responseJson = await response.json() as PostcodeResponseType;
      
      const long = responseJson.result.longitude;
      const lat = responseJson.result.latitude;

      return [long, lat];

    } catch (error) {
      if (error instanceof Error) {console.error(error)}
      return [];
    } finally {
      console.log("Request complete");
    }
  }

  const getStopCodes = async(longLat : number[]) : Promise<string[]> => {
    console.log(longLat);
    try {
      const response = await fetch(`https://api.tfl.gov.uk/StopPoint?stopTypes=NaptanBusCoachStation,%20NaptanBusWayPoint,%20NaptanOnstreetBusCoachStopCluster,%20NaptanOnstreetBusCoachStopPair,%20NaptanPublicBusCoachTram&lat=${longLat[1]}&lon=${longLat[0]}`);
      const responseJson = await response.json() as TFLStopPointsfromLongLatResponseType;

      const stopCodes: string[] = []

      for (let stopPoint of responseJson.stopPoints) {
        stopCodes.push(stopPoint.lineGroup[0].naptanIdReference);
        stopCodes.push(stopPoint.lineGroup[1].naptanIdReference);
      }

      return stopCodes;
    } catch (error: any) {
      console.error(error)
      return [];
    } finally {
      console.log("Request complete")
    }
  }
  

  const fetchBusData = async (stopCodes : string[]) : Promise<BusStop[]> => {

    const busStopList: BusStop[] = [];

    for (let stopCode of stopCodes) {
      try {
        const response = await fetch(`https://api.tfl.gov.uk/StopPoint/${stopCode}/Arrivals?app_key=c17fa326f0c94b5884f0a939e61b24a5`);
        const responseJson = await response.json() as TFLStopPointPropertiesResponseType[];
        responseJson.sort((a: TFLStopPointPropertiesResponseType,b: TFLStopPointPropertiesResponseType) => (a.timeToStation > b.timeToStation) ? 1 : -1)
        
        console.log('=======');
        console.log(`Bus stop: ${responseJson[0].stationName}`);

        const buses : Bus[] = [];

        for (let i = 0; i < 5; i++) {
          if (i >= responseJson.length) {
            break
          }
          const bus : Bus = {busNumber: i+1, busRoute: responseJson[i].lineId, destination: responseJson[i].destinationName, minutesToArrival: Math.round((responseJson[i].timeToStation)/60), directionIsInbound: (responseJson[i].direction == 'inbound')};
          buses.push(bus);
        }

        busStopList.push({stopName: responseJson[0].stationName, buses: buses});

      } catch (error) {
        console.error(error);
        
      } finally {
        console.log("Request complete");
      }
    }
    return busStopList;
  }

  const longLat : number[] = await getLongLat(inputPostcode);
  const stopCodes : string[] = await getStopCodes(longLat);

  const busStopList = await fetchBusData(stopCodes);

  console.log(busStopList)

  return busStopList;
}

//const result = await busArrivals('NW51TL')
//console.log(result);