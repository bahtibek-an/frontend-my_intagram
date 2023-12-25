import { authSelector } from 'features/auth';
import { conversationSelector } from 'features/conversations';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { useAppSelector, useClickOutside } from 'hooks';
import { IMAGES } from 'images';
import { db } from 'lib/firebase';
import React, { useRef, useState } from 'react';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { IMessage, IMessageType } from 'shared';
import { v4 as uuid } from 'uuid';
import './Message.css';

const listReactions = [
   {
      key: uuid(),
      img: IMAGES.heart,
   },
   {
      key: uuid(),
      img: IMAGES.haha,
   },
   {
      key: uuid(),
      img: IMAGES.wow,
   },
   {
      key: uuid(),
      img: IMAGES.angry,
   },
   {
      key: uuid(),
      img: IMAGES.like,
   },
];

interface Props {
   message: IMessage;
   isRight: boolean;
}
const Message: React.FC<Props> = ({ message, isRight }) => {
   const { currentConversation } = useAppSelector(conversationSelector);
   const [showTooltip, setShowTooltip] = useState<boolean>(false);
   const [showReaction, setShowReaction] = useState<boolean>(false);
   const tooltipRef = useClickOutside(() => {
      setShowTooltip(false);
   });
   const reactionRef = useClickOutside(() => {
      setShowReaction(false);
   });
   const textMessageRef = useRef<HTMLDivElement | null>(null);
   const { user } = useAppSelector(authSelector);

   const handleUnSendMessage = async () => {
      await deleteDoc(
         doc(
            db,
            `conversations/${currentConversation?._conversationDocId}/messages`,
            message._docId as string
         )
      );
   };

   const handleCopyTextMessage = () => {
      const r = document.createRange();
      r.selectNode(textMessageRef.current as Node);
      window.getSelection()?.removeAllRanges();
      window.getSelection()?.addRange(r);
      document.execCommand('copy');
      window.getSelection()?.removeAllRanges();
   };

   const handleReaction = (reaction: string) => {
      const isReacted = message._userReactions.find(
         (_user) => _user._username === user?.username
      );

      const newUserReaction = !!isReacted
         ? [...message._userReactions].filter(
              (_user) => _user._username !== user?.username
           )
         : [
              ...message._userReactions,
              {
                 _username: user?.username as string,
                 _avatar: user?.avatar as string,
                 _react: reaction,
              },
           ];

      updateDoc(
         doc(
            db,
            `conversations/${currentConversation?._conversationDocId}/messages`,
            message._docId as string
         ),
         {
            _userReactions: newUserReaction,
         }
      );
   };

   return (
      <div className="flex ">
         <div
            className={`message-wrap ${isRight ? 'isRight' : ''}`}
            title={message._sender._username}
         >
            <div className="relative">
               {message._type === IMessageType.TEXT && (
                  <div className="message-content" ref={textMessageRef}>
                     {message._message}
                  </div>
               )}
               {message._type === IMessageType.IMG_ICON && (
                  <img src={message._message} alt="" className="w-7 h-7" />
               )}
               {message._type === IMessageType.IMG && (
                  <img
                     src={message._message}
                     alt=""
                     className="md:max-w-xs rounded max-w-[180px]"
                  />
               )}
               {message._userReactions.length > 0 && (
                  <div className="absolute top-[calc(100%_-_8px)] right-0 flex items-center">
                     {message._userReactions.map((_user) => (
                        <div
                           key={_user._username}
                           className="w-4 animate-fadeIn"
                        >
                           <img src={_user._react} alt="" />
                        </div>
                     ))}
                  </div>
               )}
            </div>

            <div className="reaction-wrap">
               <button className="action" onClick={() => setShowReaction(true)}>
                  <svg
                     aria-label="Emoji"
                     color="#8e8e8e"
                     fill="#8e8e8e"
                     height="16"
                     role="img"
                     viewBox="0 0 24 24"
                     width="16"
                     className="transition-all"
                  >
                     <path d="M15.83 10.997a1.167 1.167 0 101.167 1.167 1.167 1.167 0 00-1.167-1.167zm-6.5 1.167a1.167 1.167 0 10-1.166 1.167 1.167 1.167 0 001.166-1.167zm5.163 3.24a3.406 3.406 0 01-4.982.007 1 1 0 10-1.557 1.256 5.397 5.397 0 008.09 0 1 1 0 00-1.55-1.263zM12 .503a11.5 11.5 0 1011.5 11.5A11.513 11.513 0 0012 .503zm0 21a9.5 9.5 0 119.5-9.5 9.51 9.51 0 01-9.5 9.5z"></path>
                  </svg>
               </button>
               {showReaction && (
                  <div
                     ref={reactionRef}
                     className=" absolute reaction w-max p-2 gap-x-2 animate-fadeIn z-10"
                  >
                     {listReactions.map((_react) => (
                        <div
                           key={_react.key}
                           className="flex-shrink-0 cursor-pointer"
                           onClick={() => {
                              handleReaction(_react.img);
                           }}
                        >
                           <img src={_react.img} alt="" className="w-6 h-6" />
                        </div>
                     ))}
                  </div>
               )}
            </div>
            <div className="tooltip-wrap " ref={tooltipRef}>
               <button className="action" onClick={() => setShowTooltip(true)}>
                  <HiOutlineDotsHorizontal
                     color="#8e8e8e"
                     fill="#8e8e8e"
                     className="transition-all"
                  />
               </button>
               {showTooltip && (
                  <div className="tooltip animate-fadeIn">
                     {message._sender._id === user?.userId && (
                        <div
                           className="p-2 cursor-pointer"
                           onClick={handleUnSendMessage}
                        >
                           Unsend
                        </div>
                     )}
                     {message._type === IMessageType.TEXT && (
                        <div
                           className="p-2 cursor-pointer"
                           onClick={handleCopyTextMessage}
                        >
                           Copy
                        </div>
                     )}
                     <div className="p-2 cursor-pointer">Like</div>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
};

export default Message;
