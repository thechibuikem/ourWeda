import { useEffect, useContext, type FC } from "react";
import { weatherContext } from "../context/WeatherContext";
import DigitalClock from "./Date+Time+Location";

// the main weather card functional component that gets exported to the screen
const WeatherCard: FC = () => {
  // initializing context i.e middle man between us and context.txt
  const context = useContext(weatherContext);
  if (!context)
    throw new Error(
      "WeatherCard can't access weather context because it's not inside weather provider "
    );

  // importing or destructuring these state and state functions from context
  const { weather,icon} = context;

  useEffect(() => {
    // creatng an asynchronous function that assigns



  }, []);
  // the main xml that's being returned on the weather card
  return (
    <div className="w-full h-full flex sm:flex-row flex-col sm:justify-center  justify-between bg-green-950 rounded-xl text-white gap-y-8 p-4  hover:-translate-y-1 transition-transform cursor-pointer caret-[#ffffff00]">
      {/* combination of weather icon + definition */}
    
      <figure className="flex flex-col justify-center items-start sm:items-center w-full -mt-10 mr-4">
{icon? 
        <img
          src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
          className="-ml-8 sm:ml-0"
          alt="cloud showing the current weather condition"
        />
      :<div className="w-[6rem] bg-red-600 aspect-square"></div>}
        <h2 className="header-font text-4xl text-[#ffffff9f] sm:text-center capitalize">{weather}</h2>
      </figure>
      {/* combination of date+time+locatiob */}
      <DigitalClock/>     
    </div>
  );
};

export default WeatherCard;
