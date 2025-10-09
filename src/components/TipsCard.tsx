import { useContext, useEffect, useState, type FC } from "react";
import { weatherContext } from "../context/WeatherContext";
import Preloader from "./preloader";

// the container holding the tips returned from our backend
const MainTips: FC = () => {
  const context = useContext(weatherContext); // create a context instance
  const [tips, setTips] = useState<string[]>([]);
  const [isLoading] = useState(false); // loading state
  
  // Check if context exists
  if (!context) {
    throw new Error("MainTips must be used within WeatherProvider");
  }

  const {recommendations} = context

  useEffect(()=>{
if (isLoading) return

    setTips(recommendations)
  }
,[recommendations])

// where our jsx is returned in
  return (
    <section className="w-full min:h-[60vh] sm:min-h-[15vh] h-full rounded-sm shadow-md bg-green-600 cursor-arrow hover:-translate-y-1 transition-transform p-4 overflow-y-scroll md:overflow-hidden tips-wrapper flex flex-col gap-y-4">
      {/* generating tips from returned tips from backend  */}
      {tips.length !== 0 ? (
        tips.map((tip, index) => <p key={index} className="text-white text-md leading-tight">{tip}</p>)
      ) : (
        <div className="w-full h-full flex justify-center items-center sm:items-start sm:mt-4">
          <Preloader width={"4rem"}/>
        </div>
      )}
    </section>
  );
};

const TipsCard: FC = () => {
  return (
    <section className="w-full h-full bg-green-800 rounded-xl flex flex-col md:gap-y-8 gap-y-4 items-center pt-4 md:pt-8 md:pb-4 md:px-4 px-4 pb-4 sm:pb-4  shadow-md hover:shadow-sm cursor-pointer hover:-translate-y-1 transition-transform">
      {/* the header of the tips section */}
      <h1 className="md:text-4xl text-neutral-100 text-2xl header-font">
        Tips
      </h1>
      {/* the header of the tips section */}
      <MainTips />
    </section>
  );
};

export default TipsCard;
