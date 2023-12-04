import React from "react";

const HeaderHomePage = () => {
  return (
    <div className="fixed top-0 z-50 flex items-center justify-between w-full px-3 bg-white border sm:hidden h-14 border-b-black">
      <h1 className="py-5 text-2xl">Instagram</h1>
      <div>
        <i className="mr-3 text-3xl bx bx-heart"></i>
        <i className="text-3xl bx bxl-messenger"></i>
      </div>
    </div>
  );
};

export default HeaderHomePage;
