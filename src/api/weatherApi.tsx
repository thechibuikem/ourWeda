// Create a helper that returns a Promise with coords
const getLocation = (): Promise<{ lat: number; lon: number }> => {
  
  // defining promise function getting latitude and longitude we'd use this in our weatherapi call
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

// creating interface for 
export interface WeatherResponse {
  temperature: number;
  humidity:number
  windSpeed:number
  cloudCover:number
  condition: string;
  description: string;
  country: string;
  city: string;
  icon: string;

}

export const getWeather = async (): Promise<WeatherResponse> => {
  try {
    const { lat, lon } = await getLocation(); //always wait for co-ordinates before fetching
    const url = `${WEATHER_API_BASE_URL}lat=${lat}&lon=${lon}&appid=${OPEN_API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        "The weather data returned from api was not okay " + response.statusText
      );
    }
    const data = await response.json(); //convert response to javascript object notation
//////////////////////////////////////////
    const temperature = data.main.temp; //temperature
    const humidity = data.main.humidity//humidity
    const windSpeed = data.wind.speed//wind speed
    const cloudCover = data.clouds.all//percentage of cloud cover
    const condition = data.weather[0].main; //weather condition
    const description = data.weather[0].description; // weather description
    const icon = data.weather[0].icon; //  targetting the weather icon
    const city = data.name;//city name
    const country = data.sys.country;//country name
////////////////////////////////////////
    // creating the response that our weatherapi would return
    const WeatherApiResponse: WeatherResponse = {
      temperature: temperature,
      condition: condition,
      description: description,
      country: country,
      city: city,
      icon: icon,
      humidity:humidity,
      windSpeed:windSpeed,
      cloudCover:cloudCover,
    };
////////////////////
    return WeatherApiResponse; //returning the whole weather response

    // catching ang errors on fetching the weather
  } catch (error) {
    console.log("unexpected error occured", error);
    throw error;
  }
};
