// import { getLocation } from "../utils/getLocation";

import { type WeatherKind,WEATHER_KINDS } from "../context/WeatherContext";

// Create a helper that returns a Promise with coords
const getLocation = (): Promise<{ lat: number; lon: number }> => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => reject(error)
    );
  });
};



// importing our open weather api key and url from api
const OPEN_API_KEY = import.meta.env.VITE_OPEN_WEATHER_KEY;
const WEATHER_API_BASE_URL = import.meta.env.VITE_OPEN_WEATHER_BASE_URL;


// const fetchUserLocation = async (): Promise<void> => {
//   try {
//     [lat, lon] = await getLocation();

//     console.log([lat, lon]);
//   } catch {
//     throw new Error(
//       "error obtaining latitude and longitude from required getLocation module"
//     );
//   }
// };
// fetchUserLocation();

export interface WeatherResponse {
  temperature: number;
  condition: WeatherKind;
  country:string;
  city:string
  icon: string;
}


//this function takes in the condition provided by Open Weather Api and returns a value that matches our weather kinf
const weatherMapper = (condition: string): WeatherKind  => {
// take condition returned by open weather api to lower case
  const lowerCondition = condition.toLowerCase();

  for (const weather of WEATHER_KINDS){
    if (lowerCondition === weather.toLowerCase()){
      return weather
    }
//fallback incase no weather matches
}
return "untracked"
}
// creating and exporting function that would trigger api call and retreieve weather
export const getWeather = async (): Promise<WeatherResponse> => {
  try {

    const {lat,lon} = await getLocation();//always wait for co-ordinates before fetching
    const url = `${WEATHER_API_BASE_URL}lat=${lat}&lon=${lon}&appid=${OPEN_API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        "The weather data returned from api was not okay " + response.statusText
      );
    }
    const data = await response.json(); //convert response to javascript object notation

    console.log("here's our data: ", data)
    //after we get the response in json form, it is now data

    //targeting the main weather condition
    const condition = weatherMapper(data.weather[0].main);

    console.log("our current condition is:", condition);
    // targetting the temperature
    const temperature = data.main.temp;
    //  targetting the icon
    const icon = data.weather[0].icon;
    const city = data.name;
    const country = data.sys.country
    // creating the weather response
    console.log("our current condition is:", icon);
    const WeatherResponse =  {
      temperature: temperature,
      condition: condition,
      country:country,    
      city:city,
      icon: icon,
    };
    return WeatherResponse //returning the whole weather response
  } catch (error) {
    console.log("unexpected error occured", error);
    throw error;
  }
};
