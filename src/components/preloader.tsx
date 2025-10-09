import React from "react";
import { ClipLoader } from "react-spinners";

interface PreloaderProps {
  /** Width of the spinner (also used as height) */
  width: number | string;
  /** Optional color */
  color?: string;
}

const Preloader: React.FC<PreloaderProps> = ({
  width,
  color = "#ffffff44",
}) => {
  const size = typeof width === "number" ? `${width}px` : width; // if the type of width is a number let size be width converted to a pixel value, else it's a string and we'll just use it like that
  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ClipLoader color={color} size={size} />
    </div>
  );
};

export default Preloader;
