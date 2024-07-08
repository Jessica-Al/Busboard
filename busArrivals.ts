

function busArrivals() {

    const fetchData = async () => {
        try {

          const response = await fetch("https://api.tfl.gov.uk/StopPoint/490008660N/Arrivals?app_key=c17fa326f0c94b5884f0a939e61b24a5");
          const responseJson = await response.json();
          responseJson.sort((a,b) => (a.timeToStation > b.timeToStation) ? 1 : -1)
          
          for (let i = 0; i < 5; i++) {
            console.log(responseJson[i].lineId);
            console.log(responseJson[i].destinationName);
            console.log(Math.round((responseJson[i].timeToStation)/60));
          }
          
        } catch (error) {
          console.error(error);
        } finally {
          console.log("Request complete");
        }
      }

      fetchData()
}

busArrivals()