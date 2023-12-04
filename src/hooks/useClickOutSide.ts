import { useEffect, useRef } from 'react';

export function useClickOutside(
   handler: (event?: MouseEvent | TouchEvent) => void
) {
   const ref = useRef<any>(null);

   useEffect(() => {
      const listener = (event: MouseEvent | TouchEvent) => {
         // Do nothing if clicking ref's element or descendent elements
         if (!ref.current || ref.current.contains(event.target)) {
            return;
         }

         handler(event);
      };

      document.addEventListener('click', listener);
      document.addEventListener('touchstart', listener);

      return () => {
         document.removeEventListener('click', listener);
         document.removeEventListener('touchstart', listener);
      };
   }, [ref, handler]);

   return ref;
}
