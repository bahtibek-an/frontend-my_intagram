import React, { useEffect, useState } from "react";
import homephone from "../../imgs/home-phones.png";
import imgScr1 from "../../imgs/screenshot1.png";
import imgScr2 from "../../imgs/screenshot2.png";
import imgScr3 from "../../imgs/screenshot3.png";
import imgScr4 from "../../imgs/screenshot4.png";

const HomePhone = () => {
  const [image, setImage] = useState(imgScr1);

  useEffect(() => {
    const smallImages = [imgScr2, imgScr3, imgScr4];
    const interval = setInterval(() => {
      const newIndex = (smallImages.indexOf(image) + 1) % smallImages.length;
      setImage(smallImages[newIndex]);
    }, 4000);
    return () => clearInterval(interval);
  }, [image]);

  return (
    <div className=" hidden lg:inline-block relative w-[465px] h-auto mr-0">
      <img className=" z-1" src={homephone} alt="" />
      <img className="absolute z-0 top-6 right-14" src={image} alt="" />
    </div>
  );
};

export default HomePhone;
