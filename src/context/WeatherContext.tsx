import { createContext, useEffect, useState, type ReactNode } from "react";
import { getWeather } from "../api/weatherApi";

// creating interface for backend data
interface backendData {
  tips: string[];
}

//creating the interface for WeatherContextType
export interface WeatherContextType {
  weather: string | null;
  icon: string | null;
  loading: boolean;
  city: string | null;
  country: string | null;
  temperature: number | null;
  recommendations: string[];
  setRecommendations: (w: string[]) => void;
  setCountry: (w: string) => void;
  setTemperature: (w: number) => void;
  setCity: (w: string) => void;
  setLoading: (w: boolean) => void;
  setWeather: (w: string) => void;
  setIcon: (w: string) => void;
}
// create the context and export it
export const weatherContext = createContext<WeatherContextType | undefined>(
  undefined
);

// here we are creating context provider so use context in children states
export const WeatherProvider = ({ children }: { children: ReactNode }) => {
  const [weather, setWeather] = useState<string | null>(null);
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
        const data = await getWeather(); //data is the response I augumented from my WeatherAPI call
        // begin setting states for our frontend react app
        setWeather(data.condition);
        setIcon(data.icon);
        setCity(data.city);
        setCountry(data.country);
        setTemperature(data.temperature);
        setLoading(false); // terminate loading

        // sending weather details to our python backend
        const res = await fetch("https://ourweda.onrender.com/api/recommend", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            /*The r_ before the word's used denotes recommendation, reminding us that this key value pair is being sent to the backend for the ai recommendation*/
            r_temperature: data.temperature,
            r_humidity: data.humidity,
            r_condition: data.condition,
            r_description: data.description,
            r_windSpeed: data.windSpeed,
            r_cloudCover: data.cloudCover,
          }),
        });

        // checking if response from fastapi backend is okay
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const backendData: backendData = await res.json();
        if (Array.isArray(backendData.tips)) {
          setRecommendations(backendData.tips);
        } else {
          console.error("Backend did not return tips array", backendData);
          // fallback recommendations
          setRecommendations([
            "Use energy-efficient appliances",
            "Walk or bike for short trips",
            "Plant trees",
            "Reduce plastic waste",
          ]);
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
