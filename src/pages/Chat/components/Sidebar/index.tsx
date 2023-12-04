import Avatar from 'components/Avatar';
import { formatDistance } from 'date-fns';
import { authSelector } from 'features/auth';
import { selectConversation } from 'features/conversations';
import { conversationSelector } from 'features/conversations/conversationsSlice';
import { useAppDispatch, useAppSelector, useIsMounted } from 'hooks';
import { IMAGES } from 'images';
import React, { useEffect, useState } from 'react';
import { getMemberInConversation } from 'services/getMemberInConversation';
import { IConversation, IMessageType, IUser } from 'shared';
import { getConversationName } from 'utils';
import ModalCreateConversation from '../ModalCreateConversation';

const Sidebar = () => {
   const { user } = useAppSelector(authSelector);
   const [showModal, setShowModal] = useState<boolean>(false);
   const { conversations, currentConversation } =
      useAppSelector(conversationSelector);
   const dispatch = useAppDispatch();
   const isMounted = useIsMounted();

   return (
      <div className="h-full flex flex-col ">
         <div className="h-header-height flex-shrink-0 flex items-center justify-between px-4 border-b border-r border-solid border-border-color">
            <div className=" flex items-center gap-x-6">
               <Avatar
                  src={user?.avatar as string}
                  alt={user?.fullName as string}
                  className="w-10 h-10"
               />
               <h1 className="text-center font-bold text-text-color-black ">
                  {user?.username}
               </h1>
            </div>
            <button
               onClick={() => {
                  setShowModal(true);
               }}
            >
               <svg
                  aria-label="New Message"
                  color="#262626"
                  fill="#262626"
                  height="24"
                  role="img"
                  viewBox="0 0 24 24"
                  width="24"
               >
                  <path
                     d="M12.202 3.203H5.25a3 3 0 00-3 3V18.75a3 3 0 003 3h12.547a3 3 0 003-3v-6.952"
                     fill="none"
                     stroke="currentColor"
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     strokeWidth="2"
                  ></path>
                  <path
                     d="M10.002 17.226H6.774v-3.228L18.607 2.165a1.417 1.417 0 012.004 0l1.224 1.225a1.417 1.417 0 010 2.004z"
                     fill="none"
                     stroke="currentColor"
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     strokeWidth="2"
                  ></path>
                  <line
                     fill="none"
                     stroke="currentColor"
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     strokeWidth="2"
                     x1="16.848"
                     x2="20.076"
                     y1="3.924"
                     y2="7.153"
                  ></line>
               </svg>
            </button>
         </div>
         <div className="h-full border-r border-solid border-border-color overflow-y-auto">
            <ul>
               {conversations.map((conversation) => {
                  return (
                     <li
                        key={conversation._conversationId}
                        onClick={() => {
                           if (
                              currentConversation?._conversationId !==
                              conversation._conversationId
                           ) {
                              dispatch(selectConversation(conversation));
                           }
                        }}
                     >
                        <SidebarItem
                           conversation={conversation}
                           type={conversation._lastMessage?._type as string}
                        />
                     </li>
                  );
               })}
            </ul>
         </div>
         {showModal && (
            <ModalCreateConversation
               onClose={() => {
                  if (isMounted()) {
                     setShowModal(false);
                  }
               }}
            />
         )}
      </div>
   );
};

interface SidebarItemProps {
   conversation: IConversation;
   type: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ conversation, type }) => {
   const { currentConversation } = useAppSelector(conversationSelector);
   const [members, setMembers] = useState<IUser[]>([]);
   const { user } = useAppSelector(authSelector);

   useEffect(() => {
      getMemberInConversation(conversation._member)
         .then((members) => {
            setMembers(members as IUser[]);
         })
         .catch((error) => {
            console.log(error);
         });
   }, [conversation._member]);

   return (
      <div
         className={`flex items-center gap-x-3 py-2 px-5 cursor-pointer hover:bg-gray-200 transition-[background-color] ${
            currentConversation?._conversationId ===
            conversation._conversationId
               ? 'bg-gray-200'
               : ''
         } w-full`}
      >
         <Avatar src={IMAGES.noAvatar} alt="" className="w-14 h-14" />
         <div className="flex flex-col gap-y-1 w-full">
            <h4 className="font-medium text-text-color-black line-clamp-1">
               {getConversationName(members, user?.username as string)}
            </h4>
            {conversation._lastMessage && (
               <div className="text-text-color-gray w-full flex items-center gap-x-1  ">
                  <span className="line-clamp-1 max-w-[80px]">
                     {type === IMessageType.FILE
                        ? 'File'
                        : type === IMessageType.IMG_ICON
                        ? 'Icon'
                        : conversation._lastMessage._message}
                  </span>
                  <span>-</span>
                  <span>
                     {formatDistance(
                        new Date(
                           conversation._lastMessage?._createAt as string
                        ),
                        new Date(),
                        { addSuffix: true }
                     )}
                  </span>
               </div>
            )}
         </div>
      </div>
   );
};

export default React.memo(Sidebar);
