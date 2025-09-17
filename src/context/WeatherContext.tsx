import { createContext, useEffect, useState, type ReactNode } from "react";
import { getWeather} from "../api/weatherApi";
// creating an array of constants that wouuld hold weather kinds
export const WEATHER_KINDS = [
  "clouds",
  "clear",
  "rain",
  "thunderstorm",
  "snow",
  "mist",
  "sunny",
  "cloudy",
  "rainy",
  "clear sky",
  "few clouds",
  "scattered clouds",
  "broken clouds",
  "shower rain",
  "untracked",
] as const;

// creating and exporting our weatherKind type variable
export type WeatherKind = (typeof WEATHER_KINDS)[number];

// create the context and export it
export const weatherContext = createContext<WeatherContextType | undefined>(
  undefined
);


//creating the interface for WeatherContextType
interface WeatherContextType {
  weather: WeatherKind;
  icon: string;
  loading: boolean;
  city: string;
  country: string;
  setCountry: (w:string)=> void
  setCity: (w: string) => void;
  setLoading: (w: boolean) => void;
  setWeather: (w: WeatherKind) => void;
  setIcon: (w: string) => void;
}


// here we are creating context provider so use context in children states
export const WeatherProvider = ({ children }: { children: ReactNode }) => {
  const [weather, setWeather] = useState<WeatherKind>("sunny");
  const [loading, setLoading] = useState(true);
  const [icon, setIcon] = useState<string>("");
  const [city,setCity]= useState<string>("city")
  const [country,setCountry]= useState<string>("country")

  useEffect(() => {
    setLoading(true); // start loading before fetching
    getWeather()
      .then((data) => {
        setWeather(data.condition);
        setIcon(data.icon)
        setCity(data.city)
        setCountry(data.country)
        // saving condition only
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <weatherContext.Provider
      value={{ weather, setWeather, icon, city, country,setCountry, setCity, setIcon, loading,setLoading }}
    >
      {children}
    </weatherContext.Provider>
  );
};
