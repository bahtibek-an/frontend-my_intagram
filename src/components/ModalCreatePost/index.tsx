import Avatar from 'components/Avatar';
import ModalWrap from 'components/ModalWrap';
import Spiner from 'components/Spiner';
import { authSelector } from 'features/auth';
import { useAppSelector, useClickOutside } from 'hooks';
import React, { useMemo, useRef, useState } from 'react';
import { IoIosClose } from 'react-icons/io';
import { addDocument } from 'services';
import { uploadImg } from 'services/uploadImg';
import { IPost } from 'shared';
import { v4 as uuidv4 } from 'uuid';

interface Props {
   onClose: () => any;
}

const ModalCreatePost: React.FC<Props> = ({ onClose }) => {
   const inputRef = useRef<HTMLInputElement | null>(null);
   const [file, setFile] = useState<File | null>(null);
   const [imgPreview, setImgPreview] = useState('');
   const { user } = useAppSelector(authSelector);
   const [inputText, setInputText] = useState<string>('');
   const [loading, setLoading] = useState<boolean>(false);
   const myElRef = useClickOutside(() => {
      if (loading) {
         return;
      }
      onClose();
   });

   const empty = useMemo(
      () => !file && inputText.trim().length === 0 && imgPreview.length === 0,
      [file, inputText, imgPreview]
   );

   const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
         setFile(file);
         setImgPreview(URL.createObjectURL(file));
      }
   };

   const handlePost = async () => {
      if (file && inputText.trim().length > 0) {
         setLoading(true);
         const url = await uploadImg(file, `img-posts/${file?.name}`);
         const data: IPost = {
            _content: inputText,
            _image: url,
            _location: 'Phu Yen',
            _user: {
               _userId: user?.userId as string,
            },
            _userComments: [],
            _userLikes: [],
            createdAt: new Date().toISOString(),
            postId: uuidv4(),
         };
         await addDocument('posts', data);
         setLoading(false);
         setFile(null);
         setInputText('');
         setImgPreview('');
         onClose();
      }
   };

   return (
      <ModalWrap>
         <div
            className="rounded-lg bg-white w-full max-w-[835px] mx-auto overflow-hidden  "
            ref={myElRef}
         >
            {loading && (
               <ModalWrap>
                  <div className="mx-auto w-fit">
                     <Spiner color="#fff" />
                  </div>
               </ModalWrap>
            )}
            <div>
               <div className="flex items-center justify-between px-4  border-b border-solid border-border-color  h-11">
                  <button
                     onClick={(e) => {
                        onClose();
                     }}
                     className="font-medium text-text-color-black"
                  >
                     Cancel
                  </button>
                  <h1 className="text-base font-semibold ">Create new post</h1>
                  <button
                     className="font-medium text-blue-color disabled:text-blue-color/70"
                     disabled={empty}
                     onClick={(e) => {
                        e.stopPropagation();
                        handlePost();
                     }}
                  >
                     Share
                  </button>
               </div>
               <div className="flex flex-col md:flex-row">
                  {imgPreview.length > 0 ? (
                     <div className=" w-[100%] h-[440px]  md:w-full md:max-w-[440px] md:aspect-square flex-shrink-0 relative animate-fadeIn  self-center md:h-[unset]">
                        <img
                           src={imgPreview}
                           alt=""
                           className="w-full h-full object-cover"
                        />
                        <button
                           className="absolute z-10 w-9 h-9 rounded-full bg-white shadow-box-shadow right-4 top-4 flex items-center justify-center"
                           onClick={(e) => {
                              e.stopPropagation();
                              setImgPreview('');
                              setFile(null);
                           }}
                        >
                           <IoIosClose className="w-6 h-6 text-text-color-black" />
                        </button>
                     </div>
                  ) : (
                     <div className="md:min-h-[440px] md:min-w-[440px] w-full md:max-w-[440px] flex flex-col items-center justify-center gap-y-6 animate-fadeIn py-9 md:p-0">
                        <svg
                           aria-label="Icon to represent media such as images or videos"
                           color="#262626"
                           fill="#262626"
                           height="77"
                           role="img"
                           viewBox="0 0 97.6 77.3"
                           width="96"
                        >
                           <path
                              d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z"
                              fill="currentColor"
                           ></path>
                           <path
                              d="M84.7 18.4L58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5l-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z"
                              fill="currentColor"
                           ></path>
                           <path
                              d="M78.2 41.6L61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6l-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z"
                              fill="currentColor"
                           ></path>
                        </svg>

                        <button
                           className="h-8 py-[5px] px-[10px] bg-blue-color hover:bg-blue-color/80 transition-[background-color] rounded font-medium text-white"
                           onClick={(e) => {
                              inputRef.current?.click();
                           }}
                        >
                           Select from computer
                        </button>
                        <input
                           type="file"
                           accept="image/*"
                           className="hidden"
                           ref={inputRef}
                           onChange={handleChangeFile}
                        />
                     </div>
                  )}
                  <div className="w-full ">
                     <div className="mx-4 h-header-height flex items-center gap-x-3">
                        <Avatar
                           src={user?.avatar as string}
                           alt={user?.fullName as string}
                        />
                        <h4 className="text-base font-medium">
                           {user?.username}
                        </h4>
                     </div>
                     <div>
                        <textarea
                           onChange={(e) => setInputText(e.target.value)}
                           className="focus:outline-none resize-none w-full placeholder:text-base placeholder:text-text-color-gray text-text-color-gray text-base  px-4 min-h-[200px] max-h-[200px] overflow-y-auto"
                           placeholder="Write a caption..."
                           value={inputText}
                        />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </ModalWrap>
   );
};

export default ModalCreatePost;
