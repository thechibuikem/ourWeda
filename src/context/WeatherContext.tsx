import { createContext, useEffect, useState, type ReactNode } from "react";
import { getWeather } from "../api/weatherApi";

const BACKEND_URL: string = "http://localhost:8000/api/recommend"; //endpoint I want to communicate to using my fetch request

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

//creating the interface for WeatherContextType
export interface WeatherContextType {
  weather: WeatherKind | null;
  icon: string | null;
  loading: boolean;
  city: string | null;
  country: string | null;
  temperature: number | null;
  recommendations: string[];
  setRecommendations: (r: string[]) => void;
  setCountry: (w: string) => void;
  setTemperature: (w: number) => void;
  setCity: (w: string) => void;
  setLoading: (w: boolean) => void;
  setWeather: (w: WeatherKind) => void;
  setIcon: (w: string) => void;
}
// create the context and export it
export const weatherContext = createContext<WeatherContextType | undefined>(
  undefined
);

// here we are creating context provider so use context in children states
export const WeatherProvider = ({ children }: { children: ReactNode }) => {
  const [weather, setWeather] = useState<WeatherKind | null>(null);
  const [loading, setLoading] = useState(true);
  const [icon, setIcon] = useState<string | null>(null);
  const [city, setCity] = useState<string | null>(null);
  const [country, setCountry] = useState<string | null>(null);
  const [temperature, setTemperature] = useState<number | null>(null);
  const [recommendations, setRecommendations] = useState<string[]>([]);

  useEffect(() => {
    const fetchWeatherAndSend = async () => {
      setLoading(true); // start loading before fetching
      try {
        const data = await getWeather();
        // begin setting states
        setWeather(data.condition);
        setIcon(data.icon);
        setCity(data.city);
        setCountry(data.country);
        setTemperature(data.temperature);
        setLoading(false); // terminate loading

        // send directly to backend (easiest way)
        const res = await fetch(BACKEND_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            temperature: data.temperature,
            weather: data.condition,
          }),
        });

        const backendData = await res.json();
        if (Array.isArray(backendData)) {
          setRecommendations(backendData); // save it in context
        } else {
          console.error("Backend did not return an array", backendData);
        }

        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchWeatherAndSend();
  }, []);

  return (
    <weatherContext.Provider
      value={{
        weather,
        setWeather,
        icon,
        city,
        country,
        recommendations,
        setRecommendations,
        setCountry,
        setCity,
        setIcon,
        loading,
        temperature,
        setTemperature,
        setLoading,
      }}
    >
      {children}
    </weatherContext.Provider>
  );
};
