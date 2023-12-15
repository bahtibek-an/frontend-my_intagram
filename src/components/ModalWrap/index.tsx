import { createPortal } from 'react-dom';

const modal = document.querySelector('#modal') as Element;

const ModalWrap: React.FC = ({ children }) => {
   return createPortal(
      <div className="fixed min-h-screen w-full flex items-center justify-center bg-black/60 px-4 py-8 animate-fadeIn z-[100] inset-0">
         <div className="animate-scaleUp w-full flex items-center justify-center">
            {children}
         </div>
      </div>,
      modal
   );
};

export default ModalWrap;
