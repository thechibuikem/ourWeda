import { Oval } from "react-loader-spinner";

 const Preloader = () => {
  return (
    <section className="bg-green-700 w-screen h-screen flex justify-center items-center">
      <Oval
        visible={true}
        height="80"
        width="80"
        color="#034819"
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </section>
  );
};

export default Preloader;
