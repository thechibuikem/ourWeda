import { useContext, type FC } from "react";
import { weatherContext } from "../context/WeatherContext";
import DigitalClock from "./Date+Time+Location";
import Preloader from "./preloader";

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
    <div className="w-full h-full flex sm:flex-row flex-ol sm:justify-center  justify-between bg-green-800 rounded-xl text-white gap-y-8 p-4  hover:-translate-y-1 transition-transform cursor-pointer caret-[#ffffff00]">
      {/* combination of weather icon + definition */}
      <figure className="flex flex-col sm:justify-center justify-around items-center w-full mr-4">
        {/* conditional rendering of cloud  */}
        {icon ? (
          <img
            src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
            className="-ml-2 sm:ml-0"
            alt="cloud showing the current weather condition"
          />
        ) : (
        <Preloader width={"4rem"}/>
        )}
        <h2 className="header-font md:text-4xl text-xl text-[#ffffff9f] text- capitalize">
          {weather || ""}
        </h2>
      </figure>
      {/* DateCard*/}
      <DigitalClock />
    </div>
  );
};

export default WeatherCard;
