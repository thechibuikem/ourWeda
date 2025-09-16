import {type FC} from "react"
import Header from "../components/Header";
import TipsCard from "../components/TipsCard";
import Footer from "../components/Footer";
import WeatherCard from "../components/WeatherCard";

const Home:FC = () => {
  return (
    <main className="min-h-screen w-full caret-[#ffffff00]">
      <section className="bg-blue-300 w-full h-fit grid grid-cols-1 md:grid-cols-12 md:gap-8 gap-4 md:p-8 p-4">
        {/* Tips - spans full height of all 3 components - MUST BE FIRST */}
        <div className="md:col-span-3 md:row-span-4 md:col-start-10 md:row-start-1 h-[30vh] md:h-full rounded-xl order-last md:order-first">
          <TipsCard />
        </div>

        {/* Header - fixed height */}
        <div className="md:col-span-9 h-[10vh] md:h-[20vh] flex items-center justify-center rounded-xl">
          <Header />
        </div>
        
        {/* Weather card - grows to fill available space */}
        <div className="md:col-span-9 md:row-span-2 flex-1 md:h-fill sm:h-[60vh] h-fit rounded-xl">
          <WeatherCard />
        </div>
        
        {/* Footer - fixed height */}
        <div className="md:col-span-9 h-[10vh] row-start-4  md:h-[10vh] rounded-xl">
          <Footer />
        </div>
      </section>
    </main>
  );
};

export default Home;