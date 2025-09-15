import { createContext, useState, type ReactNode } from "react";
// creating an array of constants that wouuld hold weather kinds
export const WEATHER_KINDS = [
  "clouds", "clear", "rain", "thunderstorm", "snow", "mist",
  "sunny", "cloudy", "rainy", "clear sky", "few clouds", 
  "scattered clouds", "broken clouds", "shower rain", "untracked"
] as const;


// creating and exporting our weatherKind type variable
export type WeatherKind = typeof WEATHER_KINDS[number];


//creating the interface for WeatherContextType
interface WeatherContextType {
  weather: WeatherKind;
  icon: string;
  setWeather: (w: WeatherKind) => void;
  setIcon: (w: string)=> void;
}

//creating the interface for icons

// create the context and export it
export const weatherContext = createContext<WeatherContextType | undefined>(
  undefined
);

// here we are creating context provider so use context in children states
export const WeatherProvider = ({ children }: { children: ReactNode }) => {
  const [weather, setWeather] = useState<WeatherKind>("sunny");
const [icon,setIcon]= useState<string>("")


  return (
    <weatherContext.Provider value={{ weather, setWeather,icon,setIcon }}>
      {children}
    </weatherContext.Provider>
  );
};
