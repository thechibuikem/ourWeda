// import { type WeatherContextType } from "../context/WeatherContext";


// // post request to send weather details to my particular backend file
// export const getWeatherRecommendations = async ({
// }: Partial<WeatherContextType>) => {
//   // parts of weather response needed

// //   checking if temperature and weather are still using values gotteh from default initialization
//   if(temperature === 0 || weather ==="sunny"){
// throw new Error("weather and temperature data from open weather is not available yet")
//   }

//   const payload: Partial<WeatherContextType> = {
//     temperature: temperature,
//     weather: weather,
//   };

// // error handling incase response gotten from api isn't solid

// try{
//   const res = await fetch(BACKEND_URL, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(payload),
//   });

// if (!res.ok){//checking if response is okay
//     throw new Error('Failed to fetch error recommendations')
// }

//   return res.json(); //return tips from backend incase where response is okay
// } catch (error) {
//     console.error('Error getting recommendations:', error);
//     throw error;
//   }
// };
