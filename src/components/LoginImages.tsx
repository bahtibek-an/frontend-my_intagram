"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const LoginImages = () => {
  const [activeImg, setActiveImg] = useState<number>(1);
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImg((prevActiveImg) => (prevActiveImg % 3) + 1);
    }, 4000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="hidden md:block relative w-[250px] h-[538.84px]">
      <Image
        src="/home-phones.png"
        height={634.15}
        width={468.32}
        alt="phones"
        className="absolute right-[-60px] top-[-28px] min-w-[468.32px] min-h-[634.15px] w-auto h-auto"
        priority={true}
      />
      <Image
        src="/screenshot1.png"
        fill
        sizes="100%"
        alt="screenshots"
        priority={true}
        className={`${
          activeImg == 1 ? "opacity-1" : "opacity-0"
        } transition-opacity duration-[2s]`}
      />
      <Image
        src="/screenshot2.png"
        fill
        sizes="100%"
        alt="screenshots"
        priority={true}
        className={`${
          activeImg == 2 ? "opacity-1" : "opacity-0"
        } transition-opacity duration-[2s]`}
      />
      <Image
        src="/screenshot3.png"
        fill
        sizes="100%"
        alt="screenshots"
        priority={true}
        className={`${
          activeImg == 3 ? "opacity-1" : "opacity-0"
        } transition-opacity duration-[2s]`}
      />
    </div>
  );
};

export default LoginImages;
