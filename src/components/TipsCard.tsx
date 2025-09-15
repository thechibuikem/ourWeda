import { type FC } from "react";

const MainTips: FC = () => {
  return (
    <section className="w-full min:h-[40vh] sm:min-h-[15vh] h-full rounded-sm shadow-md bg-green-900 cursor-arrow hover:-translate-y-1 transition-transform"></section>
  );
};

const TipsCard: FC = () => {
  return (
    <section className="w-full h-full bg-green-950 rounded-xl flex flex-col md:gap-y-8 gap-y-4 items-center pt-4 md:pt-8 md:pb-4 md:px-4 px-4 pb-4 sm:pb-4  shadow-md hover:shadow-sm cursor-pointer hover:-translate-y-1 transition-transform ">
      {/* the header of the tips section */}
      <h1 className="md:text-[2rem] text-neutral-100 text-2xl header-font">
        Tips4AChange
      </h1>
      {/* the header of the tips section */}
      <MainTips />
    </section>
  );
};

export default TipsCard;
