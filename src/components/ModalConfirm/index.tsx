import ModalWrap from 'components/ModalWrap';
import { useClickOutside } from 'hooks';
import React from 'react';

interface Props {
   onRemove?: () => any;
   onClose: () => any;
   title: string;
   textButtonConfirm: string;
}

const ModalConfirm: React.FC<Props> = ({
   onClose,
   onRemove,
   title,
   textButtonConfirm,
}) => {
   const modalRef = useClickOutside(() => onClose());

   return (
      <ModalWrap>
         <div className="w-[400px] bg-white rounded-lg" ref={modalRef}>
            <h3
               className="py-8 px-4 text-center text-lg font-medium"
               onClick={(e) => {
                  e.stopPropagation();
               }}
            >
               {title}
            </h3>
            <div className="flex flex-col py-2 border-solid border-t border-border-color ">
               <button
                  className="py-3 px-3 text-red-500 font-medium hover:bg-gray-200 transition-all"
                  onClick={(e) => {
                     e.stopPropagation();
                     onRemove && onRemove();
                  }}
               >
                  {textButtonConfirm}
               </button>

               <button
                  className="py-3 px-3 font-medium hover:bg-gray-200 transition-all"
                  onClick={(e) => {
                     e.stopPropagation();
                     onClose();
                  }}
               >
                  Cancel
               </button>
            </div>
         </div>
      </ModalWrap>
   );
};

export default ModalConfirm;
