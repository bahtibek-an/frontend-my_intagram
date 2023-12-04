import Spiner from 'components/Spiner';
import { authSelector } from 'features/auth';
import { conversationSelector } from 'features/conversations';
import { doc, updateDoc } from 'firebase/firestore';
import { useAppSelector } from 'hooks';
import { IMAGES } from 'images';
import { db } from 'lib/firebase';
import React, { useRef, useState } from 'react';
import { addDocument, uploadImg } from 'services';
import { IMessage, IMessageType } from 'shared';

const InputMessage = () => {
   const { currentConversation } = useAppSelector(conversationSelector);
   const { user } = useAppSelector(authSelector);
   const textareaRef = useRef<HTMLTextAreaElement | null>(null);
   const [messageText, setMessageText] = useState<string>('');
   const inputRef = useRef<HTMLInputElement | null>(null);
   const [isLoadingUploadFile, setIsLoadingUploadFile] =
      useState<boolean>(false);

   const handleFileImageChange = async (
      e: React.ChangeEvent<HTMLInputElement>
   ) => {
      const file = e.target.files?.[0];
      if (file) {
         setIsLoadingUploadFile(true);
         const url = await uploadImg(file, `img-messages`);
         handleSendMessage(url, IMessageType.IMG);
         setIsLoadingUploadFile(false);
      }
   };

   const handleSendMessage = async (_message: string, _type: IMessageType) => {
      console.log(_type);
      if (_message.trim().length === 0) {
         return;
      }
      if (currentConversation && user) {
         addDocument(
            `conversations/${currentConversation._conversationDocId}/messages`,
            {
               _createAt: new Date().toISOString(),
               _message: _message,
               _sender: {
                  _avatar: user.avatar,
                  _id: user.userId,
                  _username: user.username,
               },
               _type,
               _userReactions: [],
            } as IMessage
         );
         updateDoc(
            doc(
               db,
               'conversations',
               currentConversation._conversationDocId as string
            ),
            {
               _lastMessage: {
                  _createAt: new Date().toISOString(),
                  _message,
                  _type,
               },
            }
         );
         setMessageText('');
      }
   };

   return (
      <div className="min-h-[var(--header-height)] flex items-center px-6 flex-shrink-0 pb-6">
         <div className="flex items-center w-full px-3 rounded-2xl border-solid border py-2 gap-3">
            <button>
               <svg
                  aria-label="Emoji"
                  color="#262626"
                  fill="#262626"
                  height="24"
                  role="img"
                  viewBox="0 0 24 24"
                  width="24"
               >
                  <path d="M15.83 10.997a1.167 1.167 0 101.167 1.167 1.167 1.167 0 00-1.167-1.167zm-6.5 1.167a1.167 1.167 0 10-1.166 1.167 1.167 1.167 0 001.166-1.167zm5.163 3.24a3.406 3.406 0 01-4.982.007 1 1 0 10-1.557 1.256 5.397 5.397 0 008.09 0 1 1 0 00-1.55-1.263zM12 .503a11.5 11.5 0 1011.5 11.5A11.513 11.513 0 0012 .503zm0 21a9.5 9.5 0 119.5-9.5 9.51 9.51 0 01-9.5 9.5z"></path>
               </svg>
            </button>
            <div className="flex-1 w-full">
               <textarea
                  placeholder="Message..."
                  className="w-full h-[18px] resize-none focus:outline-none  leading-[18px] max-h-14 overflow-y-auto"
                  ref={textareaRef}
                  onInput={() => {
                     if (textareaRef.current) {
                        textareaRef.current.style.height = '18px';
                        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px 
                        `;
                     }
                  }}
                  onChange={(e) => {
                     setMessageText(e.target.value);
                  }}
                  value={messageText}
                  onKeyDown={(e) => {
                     if (messageText.trim().length === 0) {
                        return;
                     }
                     if (e.key === 'Enter') {
                        e.preventDefault();
                        handleSendMessage(messageText, IMessageType.TEXT);
                     }
                  }}
               />
            </div>
            {isLoadingUploadFile ? (
               <Spiner />
            ) : (
               <button
                  onClick={() => {
                     inputRef.current?.click();
                  }}
               >
                  <svg
                     aria-label="Add Photo or Video"
                     color="#262626"
                     fill="#262626"
                     height="24"
                     role="img"
                     viewBox="0 0 24 24"
                     width="24"
                  >
                     <path
                        d="M6.549 5.013A1.557 1.557 0 108.106 6.57a1.557 1.557 0 00-1.557-1.557z"
                        fillRule="evenodd"
                     ></path>
                     <path
                        d="M2 18.605l3.901-3.9a.908.908 0 011.284 0l2.807 2.806a.908.908 0 001.283 0l5.534-5.534a.908.908 0 011.283 0l3.905 3.905"
                        fill="none"
                        stroke="currentColor"
                        strokeLinejoin="round"
                        strokeWidth="2"
                     ></path>
                     <path
                        d="M18.44 2.004A3.56 3.56 0 0122 5.564h0v12.873a3.56 3.56 0 01-3.56 3.56H5.568a3.56 3.56 0 01-3.56-3.56V5.563a3.56 3.56 0 013.56-3.56z"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                     ></path>
                  </svg>
               </button>
            )}

            <button
               onClick={() => {
                  handleSendMessage(IMAGES.heart, IMessageType.IMG_ICON);
               }}
            >
               <svg
                  aria-label="Like"
                  color="#262626"
                  fill="#262626"
                  height="24"
                  role="img"
                  viewBox="0 0 24 24"
                  width="24"
               >
                  <path d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"></path>
               </svg>
            </button>
            <input
               type="file"
               className="hidden"
               accept="image/*"
               ref={inputRef}
               onChange={handleFileImageChange}
            />
         </div>
      </div>
   );
};

export default InputMessage;
