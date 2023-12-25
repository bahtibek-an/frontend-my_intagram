import Avatar from 'components/Avatar';
import ModalConfirm from 'components/ModalConfirm';
import { formatDistance } from 'date-fns';
import { authSelector } from 'features/auth';
import { useAppSelector, useClickOutside } from 'hooks';
import React, { useCallback, useEffect, useState } from 'react';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { IoMdRemoveCircleOutline } from 'react-icons/io';
import { MdOutlineReportGmailerrorred } from 'react-icons/md';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import {
   addComment,
   getAllComments,
   getOnlyOneUser,
   toggleLike,
} from 'services';
import { IPost, IUser } from 'shared';
import { uppercaseFirstLetter } from 'utils';

interface Props {
   post: IPost;
   onRemove?: (postId: string, docId: string) => any;
   direction?: 'vertical' | 'horizontal';
   type?: 'post';
}

const Post: React.FC<Props> = ({ post, onRemove, direction, type }) => {
   const [isLiked, setIsLiked] = useState<boolean>(false);
   const [textInputComment, setTextInputComment] = useState<string>('');
   const [isShowDropdown, setIsShowDropdown] = useState<boolean>(false);
   const [isShowModal, setIsShowModal] = useState<boolean>(false);
   const { user: currentUser } = useAppSelector(authSelector);
   const [user, setUser] = useState<IUser | null>(null);
   const dropdownRef = useClickOutside(() => {
      setIsShowDropdown(false);
   });
   const [loadingUser, setLoadingUser] = useState<boolean>(false);
   const [comments, setComments] = useState<
      {
         _id: string;
         _userId: string;
         _username?: string;
         _content: string;
      }[]
   >([]);

   const handleLike = () => {
      setIsLiked(!isLiked);
      if (currentUser) {
         toggleLike(isLiked, post, currentUser);
      }
   };

   const handleAddComment = useCallback(() => {
      if (currentUser) {
         addComment(textInputComment, currentUser.userId, post);
      }
      setTextInputComment('');
   }, [currentUser, textInputComment, post]);

   useEffect(() => {
      function handlePress(ev: KeyboardEvent) {
         if (ev.key === 'Enter') {
            handleAddComment();
         }
      }

      document.addEventListener('keydown', handlePress);
      return () => {
         document.removeEventListener('keydown', handlePress);
      };
   }, [handleAddComment]);

   useEffect(() => {
      const userExist = post._userLikes.find(
         (user) => user._userId === currentUser?.userId
      );
      if (!userExist) {
         setIsLiked(false);
      } else {
         setIsLiked(true);
      }
   }, [currentUser, post]);

   useEffect(() => {
      setLoadingUser(true);
      getOnlyOneUser('userId', post._user._userId).then((_user) => {
         if (_user) {
            setUser(_user);
            setLoadingUser(false);
         }
      });
   }, [post._user._userId]);

   useEffect(() => {
      getAllComments(post._userComments).then((value) => {
         setComments(value);
      });
   }, [post._userComments]);

   return (
      <div
         className={`w-full bg-white rounded-t border border-solid border-border-color flex ${
            direction === 'horizontal' ? 'flex-row' : 'flex-col   '
         }`}
      >
         <div className="w-full">
            <div className="h-header-height flex items-center justify-between px-5 bg-white rounded-t ">
               {loadingUser ? (
                  <div className="flex items-center gap-x-4">
                     <Skeleton circle width={36} height={36} />
                     <Skeleton width={80} height={20} />
                  </div>
               ) : (
                  <div className="flex items-center gap-x-4">
                     <Avatar
                        src={user?.avatar as string}
                        alt={user?.username as string}
                     />
                     <div>
                        <Link to={`/${user?.userId}`}>
                           <h4 className="font-medium">{user?.username}</h4>
                        </Link>
                        {post._location.length > 0 && (
                           <span>{post._location}</span>
                        )}
                     </div>
                  </div>
               )}
               {type === 'post' && (
                  <div className="relative">
                     <button
                        onClick={(e) => {
                           e.stopPropagation();
                           setIsShowDropdown(!isShowDropdown);
                        }}
                     >
                        <HiOutlineDotsHorizontal className="w-6 h-6 text-text-color-gray" />
                     </button>
                     {isShowDropdown && (
                        <div
                           className="absolute z-40 animate-slideInUp top-[40px] md:left-[-40px] left-[-105px]"
                           ref={dropdownRef}
                        >
                           <div className=" bg-white rounded-lg py-2 w-40 shadow-box-shadow">
                              {post._user._userId === currentUser?.userId && (
                                 <button
                                    className="flex items-center gap-x-[10px] px-4 py-2 hover:bg-gray-200 transition-all w-full"
                                    onClick={(e) => {
                                       e.stopPropagation();

                                       setIsShowModal(true);
                                       setIsShowDropdown(false);
                                    }}
                                 >
                                    <IoMdRemoveCircleOutline className="w-4 h-4" />
                                    <span className="text-text-color-black font-medium">
                                       Remove
                                    </span>
                                 </button>
                              )}

                              <button
                                 className="flex items-center gap-x-[10px] px-4 py-2 hover:bg-gray-200 transition-all w-full"
                                 onClick={(e) => {
                                    e.stopPropagation();
                                 }}
                              >
                                 <MdOutlineReportGmailerrorred className="w-4 h-4" />
                                 <span className="text-text-color-black font-medium">
                                    Report
                                 </span>
                              </button>
                           </div>
                        </div>
                     )}
                  </div>
               )}
            </div>
            <div className="relative aspect-square">
               <div className="w-full h-full">
                  <img
                     src={post._image}
                     alt=""
                     className={`object-cover w-full h-full `}
                  />
               </div>
            </div>
         </div>
         <div
            className={`flex flex-col ${
               direction === 'horizontal' ? 'w-[342px] flex-shrink-0' : ''
            }`}
         >
            <div className="py-4 px-5 bg-white flex flex-col gap-y-4  min-h-[7rem]">
               <div className="flex items-center gap-x-5">
                  <button onClick={handleLike}>
                     {isLiked ? (
                        <svg
                           aria-label="Unlike"
                           color="#ed4956"
                           fill="#ed4956"
                           height="24"
                           role="img"
                           viewBox="0 0 48 48"
                           width="24"
                        >
                           <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
                        </svg>
                     ) : (
                        <svg
                           width="24"
                           height="24"
                           viewBox="0 0 24 24"
                           fill="none"
                           xmlns="http://www.w3.org/2000/svg"
                        >
                           <path
                              d="M16.792 3.904C18.1064 3.97667 19.3389 4.56591 20.2208 5.54331C21.1026 6.52071 21.5624 7.80705 21.5 9.122C21.5 12.194 18.848 14.081 16.303 16.344C13.791 18.587 12.438 19.813 12 20.096C11.523 19.787 9.85701 18.273 7.69701 16.344C5.14101 14.072 2.50001 12.167 2.50001 9.122C2.43758 7.80705 2.8974 6.52071 3.77927 5.54331C4.66114 4.56591 5.89358 3.97667 7.20801 3.904C7.93616 3.88193 8.65757 4.04919 9.30173 4.3894C9.94588 4.72962 10.4907 5.23117 10.883 5.845C11.723 7.02 11.863 7.608 12.003 7.608C12.143 7.608 12.281 7.02 13.113 5.842C13.5031 5.22533 14.0481 4.7218 14.6937 4.38172C15.3393 4.04164 16.0628 3.87691 16.792 3.904ZM16.792 1.904C15.8839 1.87493 14.981 2.05109 14.1505 2.41935C13.3199 2.78762 12.5831 3.33851 11.995 4.031C11.4074 3.34053 10.6721 2.79091 9.84356 2.42276C9.01499 2.0546 8.1143 1.87732 7.20801 1.904C5.36288 1.97615 3.62139 2.77599 2.36435 4.1286C1.10731 5.48121 0.437007 7.27654 0.500013 9.122C0.500013 12.732 3.05001 14.949 5.51501 17.092C5.79801 17.338 6.08401 17.586 6.36801 17.839L7.39501 18.757C8.51505 19.8228 9.68928 20.8301 10.913 21.775C11.2368 21.9846 11.6143 22.0962 12 22.0962C12.3857 22.0962 12.7632 21.9846 13.087 21.775C14.3497 20.8013 15.5601 19.7615 16.713 18.66L17.635 17.836C17.928 17.576 18.225 17.317 18.52 17.062C20.854 15.037 23.5 12.742 23.5 9.122C23.563 7.27654 22.8927 5.48121 21.6357 4.1286C20.3786 2.77599 18.6371 1.97615 16.792 1.904Z"
                              fill="#262626"
                           />
                        </svg>
                     )}
                  </button>
                  <button>
                     <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                     >
                        <path
                           d="M20.656 17.008C21.8711 14.9061 22.2795 12.4337 21.8048 10.0527C21.3301 7.67171 20.0048 5.54496 18.0765 4.06977C16.1482 2.59458 13.7488 1.87185 11.3266 2.0366C8.9043 2.20135 6.62486 3.2423 4.91408 4.96501C3.20329 6.68771 2.17817 8.97432 2.03024 11.3977C1.8823 13.821 2.62166 16.2153 4.1102 18.1333C5.59874 20.0514 7.73463 21.3618 10.1189 21.82C12.5031 22.2782 14.9726 21.8527 17.066 20.623L22 22L20.656 17.008Z"
                           stroke="black"
                           strokeWidth="2"
                           strokeLinejoin="round"
                        />
                     </svg>
                  </button>
               </div>
               <div className="flex flex-col gap-y-2 ">
                  <h5 className="font-medium">
                     {post._userLikes.length} likes
                  </h5>
                  <div className="flex gap-x-1">
                     <h4 className="font-medium">{user?.username}</h4>
                     <p>{post._content}</p>
                  </div>
                  <div>
                     {comments.map((comment) => (
                        <div className="flex gap-x-1" key={comment._id}>
                           <h4 className="font-medium">{comment._username}</h4>
                           <p>{comment._content}</p>
                        </div>
                     ))}
                  </div>
               </div>

               <span className="font-medium text-text-color-gray">
                  {uppercaseFirstLetter(
                     formatDistance(new Date(post.createdAt), new Date(), {
                        addSuffix: true,
                     })
                  )}
               </span>
            </div>
            <div className="h-header-height border-t rounded-b border-t-border-color border-solid bg-white px-5 flex items-center gap-x-3 mt-auto">
               <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
               >
                  <path
                     d="M15.83 10.9971C15.5992 10.9971 15.3736 11.0655 15.1817 11.1937C14.9897 11.322 14.8402 11.5042 14.7518 11.7175C14.6635 11.9307 14.6404 12.1653 14.6854 12.3917C14.7305 12.6181 14.8416 12.826 15.0048 12.9892C15.168 13.1525 15.376 13.2636 15.6023 13.3086C15.8287 13.3537 16.0634 13.3305 16.2766 13.2422C16.4898 13.1539 16.6721 13.0043 16.8003 12.8124C16.9286 12.6205 16.997 12.3949 16.997 12.1641C16.997 11.8545 16.8741 11.5577 16.6552 11.3389C16.4363 11.12 16.1395 10.9971 15.83 10.9971ZM9.33 12.1641C9.33 11.9332 9.26154 11.7075 9.13326 11.5156C9.00498 11.3237 8.82267 11.1741 8.60937 11.0858C8.39607 10.9975 8.16137 10.9744 7.93497 11.0195C7.70856 11.0647 7.50063 11.1759 7.33746 11.3392C7.17429 11.5025 7.06322 11.7106 7.01831 11.937C6.97339 12.1634 6.99664 12.3981 7.08512 12.6113C7.17361 12.8246 7.32334 13.0068 7.51538 13.1349C7.70743 13.263 7.93315 13.3312 8.164 13.3311C8.47334 13.3308 8.76991 13.2077 8.98855 12.9889C9.20719 12.7701 9.33 12.4734 9.33 12.1641ZM14.493 15.4041C14.1748 15.7463 13.7896 16.0193 13.3613 16.2063C12.933 16.3932 12.4708 16.49 12.0035 16.4907C11.5362 16.4913 11.0738 16.3958 10.645 16.2101C10.2162 16.0244 9.83018 15.7524 9.511 15.4111C9.34445 15.2046 9.10269 15.0727 8.83892 15.0445C8.57515 15.0163 8.31098 15.094 8.10451 15.2606C7.89803 15.4271 7.76618 15.6689 7.73796 15.9326C7.70974 16.1964 7.78745 16.4606 7.95401 16.6671C8.46045 17.2404 9.083 17.6996 9.78037 18.014C10.4777 18.3285 11.234 18.4912 11.999 18.4912C12.764 18.4912 13.5203 18.3285 14.2176 18.014C14.915 17.6996 15.5376 17.2404 16.044 16.6671C16.204 16.4608 16.2769 16.2001 16.2473 15.9408C16.2177 15.6814 16.0878 15.4439 15.8854 15.279C15.6831 15.1141 15.4243 15.0349 15.1643 15.0583C14.9043 15.0816 14.6637 15.2057 14.494 15.4041H14.493ZM12 0.503052C9.72552 0.503052 7.50211 1.17751 5.61095 2.44115C3.71978 3.70479 2.2458 5.50084 1.37539 7.60219C0.504983 9.70354 0.277244 12.0158 0.720974 14.2466C1.1647 16.4774 2.25997 18.5265 3.86828 20.1348C5.47658 21.7431 7.52568 22.8384 9.75647 23.2821C11.9872 23.7258 14.2995 23.4981 16.4009 22.6277C18.5022 21.7573 20.2983 20.2833 21.5619 18.3921C22.8255 16.5009 23.5 14.2775 23.5 12.0031C23.4966 8.95412 22.2839 6.03105 20.1279 3.87512C17.972 1.7192 15.0489 0.506493 12 0.503052ZM12 21.5031C10.1211 21.5031 8.28435 20.9459 6.72209 19.902C5.15982 18.8581 3.94218 17.3744 3.22315 15.6385C2.50412 13.9026 2.31599 11.9925 2.68255 10.1497C3.0491 8.30687 3.95389 6.61414 5.28249 5.28554C6.61109 3.95694 8.30383 3.05215 10.1466 2.68559C11.9895 2.31903 13.8996 2.50716 15.6355 3.2262C17.3714 3.94523 18.8551 5.16287 19.899 6.72513C20.9428 8.2874 21.5 10.1241 21.5 12.0031C21.4974 14.5218 20.4956 16.9366 18.7146 18.7176C16.9336 20.4987 14.5187 21.5004 12 21.5031Z"
                     fill="#262626"
                  />
               </svg>
               <input
                  type="text"
                  placeholder="Add a comment..."
                  className="text-text-color-gray w-full"
                  value={textInputComment}
                  onChange={(e) => {
                     setTextInputComment(e.target.value);
                  }}
               />
               <button
                  className="font-medium text-blue-color disabled:opacity-60"
                  // disabled={textInputComment.trim().length === 0}
                  onClick={(e) => {
                     e.stopPropagation();
                     handleAddComment();
                  }}
               >
                  Post
               </button>
            </div>
         </div>
         {isShowModal && (
            <ModalConfirm
               onClose={() => setIsShowModal(false)}
               onRemove={() =>
                  onRemove && onRemove(post.postId, post.docId as string)
               }
               textButtonConfirm="Remove"
               title="You want to remove this post?"
            />
         )}
      </div>
   );
};

export default React.memo(Post);
