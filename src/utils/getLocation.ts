// // importing our open weather api key and url from api
// const OPEN_API_KEY = import.meta.env.VITE_OPEN_WEATHER_KEY;
// const REVERSE_GEOLOCATION_BASE_URL = import.meta.env.VITE_OPEN_REVERSE_GEOLOCATION_BASE_URL;

// // creating the coords variable that would house the location
// export let coords: number[] | unknown;

// // this function that returns a promise which is an object containing users current date and time
// export const getLocation = ():Promise<number[]> => {
//   return new Promise((resolve, reject) => {
//     // returning the wholve navigator stuff as a promise
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         //--extract values from the position object
//         const lat = position.coords.latitude;
//         const lon = position.coords.longitude;
//         // return ({lat:{lat},lon:{lon}}) unlike traditional functions you dont return in asynchronous functions yo resolve
//         resolve([lat, lon]);
//       },
//       (error) => {
//         console.error(error);
//         reject(error); //reject error incases maybe where user denies permission
//       }
//     );
//   });
// };

// // using the getLocation function in an asynchronous functin called useLocation

// export const getCityName = async ():Promise<string []> => {
//   let lat//defining our latitude and longitude that would be returned here
//   let lon //defining our latitude and longitude that would be returned here
//   let city 
//   let country 
//   // this initialization could cause an error
//   try {
//     [lat,lon] = await getLocation(); //wait for the promise to be resolved before assigning the {lat,lon} to lat and lon
//     //assuming I've gotten my latitude and longitude let me call and burn my geolocation Api here so that I can get city name
//     const url = `${REVERSE_GEOLOCATION_BASE_URL}lat=${lat}&lon=${lon}&appid=${OPEN_API_KEY}`;//setting up api url
//     const response = await fetch(url);
//     if (!response.ok){
//       throw new Error("data is nok okay");
//     }
//     const data = await response.json();
//   console.log(data)
//   country = data[0].country
//   const cityName = data[0].state
//   // getting the city without the state or any extras behind it
//   city = cityName.split(/\s+/)[0]

//     console.log(city,country)

//     return [city,country]
//   } 

//   catch (error) {
//     // if an error occurs
//     throw new Error("")
//   }
// };
