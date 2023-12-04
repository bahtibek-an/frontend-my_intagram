import Avatar from 'components/Avatar';
import { authSelector } from 'features/auth';
import { useAppSelector } from 'hooks';
import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import { followUser, getUserSuggestion } from 'services';
import { IUser } from 'shared';

const Sidebar = () => {
   const [suggestionUser, setSuggestionUser] = useState<IUser[]>([]);
   const [loadingSuggestionUser, setLoadingSuggestionUser] =
      useState<boolean>(false);
   const [imgUserLoading, setImgUserLoading] = useState<boolean>(true);
   const { user } = useAppSelector(authSelector);

   const handleFollowUser = async (userId: string) => {
      if (user && user?.docId) {
         await followUser(userId, user);
         setSuggestionUser((suggestionUser) =>
            [...suggestionUser].filter((_user) => _user.userId !== userId)
         );
      }
   };

   useEffect(() => {
      setLoadingSuggestionUser(true);
      if (user?.userId && user?.following) {
         getUserSuggestion(
            user?.following as string[],
            user?.userId as string,
            5,
            'not-in'
         ).then((value) => {
            if (value) {
               setSuggestionUser(value);
               setLoadingSuggestionUser(false);
            }
         });
      }
   }, [user?.following, user?.userId]);

   return (
      <div className="flex-1 w-full  flex-col gap-y-5 lg:flex hidden">
         <div className="flex items-center gap-x-4">
            {imgUserLoading && <Skeleton circle className="w-14 h-14" />}
            <Avatar
               src={user?.avatar as string}
               alt={user?.fullName as string}
               width="w-14"
               height="h-14"
               className={`${imgUserLoading ? 'hidden' : 'block'}`}
               onLoad={() => {
                  setImgUserLoading(false);
               }}
            />
            <div className="flex flex-col gap-y-1">
               {imgUserLoading ? (
                  <Skeleton className="w-44" />
               ) : (
                  <h4 className="font-medium text-text-color-black">
                     {user?.fullName}
                  </h4>
               )}
               {imgUserLoading ? (
                  <Skeleton className="w-16" />
               ) : (
                  <span className="text-text-color-gray text-sm ">
                     {user?.username}
                  </span>
               )}
            </div>
         </div>
         <div>
            <p className="text-text-color-gray">Suggestions for you</p>
         </div>
         <div className="flex flex-col gap-y-3">
            {loadingSuggestionUser
               ? [...new Array(5)].map((item, index) => (
                    <div className="flex gap-x-4 items-center" key={index}>
                       <Skeleton circle className="w-8 h-8" />
                       <div className="flex flex-col gap-y-1">
                          <Skeleton className="w-28 h-3" />
                          <Skeleton className="w-28 h-2" />
                       </div>
                    </div>
                 ))
               : suggestionUser.map((user) => (
                    <div
                       key={user.userId}
                       className="flex items-center justify-between "
                    >
                       <div className="flex items-center gap-x-4">
                          <Avatar src={user.avatar} alt={user.fullName} />
                          <div className="gap-y-1">
                             <Link to={`/${user.userId}`}>
                                <h4 className="font-medium text-text-color-black">
                                   {user.username}
                                </h4>
                             </Link>
                             <span className="text-xs text-text-color-gray">
                                Suggestion for you
                             </span>
                          </div>
                       </div>
                       <button
                          className="font-medium text-blue-color"
                          onClick={() => {
                             handleFollowUser(user.userId);
                          }}
                       >
                          Follow
                       </button>
                    </div>
                 ))}
         </div>
      </div>
   );
};

export default React.memo(Sidebar);
