import Avatar from 'components/Avatar';
import ModalWrap from 'components/ModalWrap';
import { authSelector } from 'features/auth';
import { useAppSelector, useClickOutside } from 'hooks';
import React from 'react';
import { IUser } from 'shared';

interface Props {
   members: IUser[];
   onClose: () => void;
   onRemove: () => void;
}

const ModalInformation: React.FC<Props> = ({ members, onClose, onRemove }) => {
   const { user } = useAppSelector(authSelector);
   const modalRef = useClickOutside(onClose);
   return (
      <ModalWrap>
         <div ref={modalRef} className="w-full rounded-lg bg-white max-w-lg">
            <div className="h-header-height flex items-center justify-center text-base font-medium border-b border-solid border-border-color">
               <h3>Details</h3>
            </div>
            <div>
               <div className="flex flex-col gap-y-3 py-2 px-4 border-b border-solid border-border-color">
                  <h3 className="font-medium text-base">Members</h3>
                  <ul className="flex flex-col gap-y-2">
                     {members.map(
                        (_member) =>
                           _member.username !== user?.username && (
                              <li
                                 key={_member.username}
                                 className="flex items-center gap-x-3"
                              >
                                 <Avatar
                                    src={_member.avatar}
                                    alt=""
                                    className="w-14 h-14"
                                 />
                                 <h4 className="font-medium">
                                    {_member.username}
                                 </h4>
                              </li>
                           )
                     )}
                  </ul>
               </div>
               <div className="flex flex-col gap-y-3 py-2 px-4">
                  <button
                     className="text-red-500 font-medium py-2"
                     onClick={onRemove}
                  >
                     Delete
                  </button>
                  <button className="text-red-500 font-medium py-2">
                     Report
                  </button>
               </div>
            </div>
         </div>
      </ModalWrap>
   );
};

export default ModalInformation;
