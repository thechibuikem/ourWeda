import { useContext, type FC } from "react";
import { weatherContext } from "../context/WeatherContext";
import DigitalClock from "./Date+Time+Location";

// the main weather card functional component that gets exported to the screen
const WeatherCard: FC = () => {
 
  const context = useContext(weatherContext); // initializing context i.e middle man between us and context.txt
  if (!context)
    throw new Error(
      "WeatherCard can't access weather context because it's not inside weather provider "
    );

  const { weather, icon } = context;  // importing or destructuring these state and state functions from context

  // the main xml that's being returned on the weather card
  return (
    <div className="w-full h-full flex sm:flex-row flex-col sm:justify-center  justify-between bg-green-800 rounded-xl text-white gap-y-8 p-4  hover:-translate-y-1 transition-transform cursor-pointer caret-[#ffffff00]">
      {/* combination of weather icon + definition */}

      <figure className="flex flex-col justify-center items-start sm:items-center w-full mr-4">
        {/* conditional rendering of cloud  */}
        {icon ? (
          <img
            src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
            className="-ml-8 sm:ml-0"
            alt="cloud showing the current weather condition"
          />
        ) : (
          <div className="w-[4rem] md:w-[6rem] animate-pulse duration-150 rounded-sm bg-[#00000076] aspect-square"></div>
        )}
        <h2 className="header-font text-3xl text-[#ffffff9f] text-center capitalize">
          {weather || "loading"}
        </h2>
      </figure>
      {/* DateCard*/}
      <DigitalClock />
    </div>
  );
};

export default WeatherCard;
