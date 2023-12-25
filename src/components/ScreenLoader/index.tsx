import { IMAGES } from 'images';
import React from 'react';

const ScreenLoader = () => {
   return (
      <div className="min-h-screen flex items-center justify-center bg-bg-color-main animate-fadeIn">
         <img src={IMAGES.ig} alt="" />
      </div>
   );
};

export default ScreenLoader;
