import { useState, useEffect, type FC, type ReactNode } from "react";
import dayjs from "dayjs";
import { getCityName } from "../utils/getLocation";



const DigitalClock: FC = (): ReactNode => {
// getting and settinh date from day.js
function getActiveDate(): void {
  setDate(dayjs().format("ddd DD MMM"));
  setTime(dayjs().format("HH:mm"));
}


  // getting users current location
  const fetchRealTimeCityAndCountry = async (): Promise<void> => {
    try {
      const [currentCity, currentCountry] = await getCityName();
      setCity(currentCity);
      setCountry(currentCountry);
    } catch (error) {
      console.error("Error getting city and country name:", error);
      setCity("Unknown");
      setCountry("Location");
    }
  };

  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime]= useState("")

  // console.log(fullDate);

  useEffect(() => {
    //calling our function to consume reverseGeoLocation API
    fetchRealTimeCityAndCountry();
    getActiveDate()
    // calling active date and time repeeatedly at intervals and saving the intervalId to a variable
   const intervalId = setInterval(()=>getActiveDate(),1000);

   return(()=>clearInterval(intervalId))//deleting interval on dismounting to fix
   //  memory leak
  }, []);

  // the jsx part of my code
  return (
    <figure
      className="flex flex-col sm:items-center justify-center bg-green-900
   shadow-lg w-full p-4 text-right gap-y-4 rounded-sm hover:-translate-y-1 transition-transform"
    >
      <h3 className="uppercase text-3xl text-[#ffffff9f]">{date}</h3>
      <h1 className="text-8xl -mt-4">{time}</h1>
      <h3 className="uppercase text-3xl text-[#ffffff9f]">
        {city} {country}
      </h3>
    </figure>
  );
};

export default DigitalClock;
