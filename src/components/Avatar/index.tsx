import React from 'react';

const Avatar: React.FC<{
   src: string;
   alt: string;
   width?: string;
   height?: string;
   className?: string;
   onLoad?: React.ReactEventHandler<HTMLImageElement>;
}> = ({ src, alt, width, height, className, onLoad }) => {
   return (
      <img
         src={src}
         alt={alt}
         className={`${width ? width : 'w-8'} ${
            height ? height : 'h-8 object-cover '
         } rounded-full ${className ? className : ''}`}
         onLoad={onLoad}
      />
   );
};

export default Avatar;
