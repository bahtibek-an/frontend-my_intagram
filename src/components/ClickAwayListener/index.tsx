import React, { useRef } from 'react';

const ClickAwayListener: React.FC<{
   onClickAway: () => any;
   className?: string;
}> = ({ onClickAway, className, children }) => {
   const wrapRef = useRef<HTMLDivElement | null>(null);

   const handleClick = (e: any) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
         onClickAway();
      }
   };
   React.useEffect(() => {
      document.addEventListener('click', handleClick);
      return () => {
         document.removeEventListener('click', handleClick);
      };
   });

   return (
      <div onClick={onClickAway} ref={wrapRef} className={className}>
         <>{children}</>
      </div>
   );
};

export default ClickAwayListener;
