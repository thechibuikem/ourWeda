import {
  useState,
  useEffect,
  useContext,
  type FC,
  type ReactNode,
} from "react";
import dayjs from "dayjs";
import { weatherContext } from "../context/WeatherContext";//so we can get city,country and the functions to update them


// the whole component housing date, time and location
const DigitalClock: FC = (): ReactNode => {
  
  // function to manipulate the date and time states using day.js
  function getActiveDate(): void {
    setDate(dayjs().format("ddd DD MMM"));
    setTime(dayjs().format("HH:mm"));
  }
  
  // getting and setting date from day.js
  const context = useContext(weatherContext);
  if (!context)
    throw new Error(
  "DateCard can't access weather context because it's not inside weather provider "
);

const { city, country, setCity, setCountry } = context;

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    getActiveDate(); // set the date and time states 
    setCity(city ?? "");
    setCountry(country??"");
    const intervalId = setInterval(() => getActiveDate(), 1000); // calling active date and time repeeatedly at intervals and saving the intervalId to a variable so we can close it on dismount to close memory leak

    return () => clearInterval(intervalId); //deleting interval on dismounting to fix memory leak
  }, []);

  // the jsx part of my code
  return (
    <figure
      className="flex flex-col sm:items-center justify-center bg-green-600
   shadow-lg w-full p-4 text-right gap-y-4 rounded-sm hover:-translate-y-1 transition-transform"
    >
      <h3 className="uppercase md:text-3xl text-2xl text-[#ffffffbf]">{date}</h3>
      <h1 className="md:text-8xl text-7xl -mt-4 text-[#ffffffe1]">{time}</h1>
      <h3 className="uppercase md:text-3xl text-2xl text-[#ffffffbf]">
        {city} {country}
      </h3>
    </figure>
  );
};

export default DigitalClock;
