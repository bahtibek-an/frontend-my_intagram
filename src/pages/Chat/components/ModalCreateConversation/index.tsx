import Avatar from 'components/Avatar';
import ModalWrap from 'components/ModalWrap';
import Spiner from 'components/Spiner';
import { authSelector } from 'features/auth';
import { selectConversation } from 'features/conversations';
import {
   arrayRemove,
   collection,
   doc,
   getDocs,
   query,
   updateDoc,
} from 'firebase/firestore';
import { useAppDispatch, useAppSelector, useClickOutside } from 'hooks';
import { db } from 'lib/firebase';
import React, { useEffect, useState } from 'react';
import { IoIosClose } from 'react-icons/io';
import { addDocument } from 'services';
import { getAllUserFollowing } from 'services/getAllUserFollowing';
import { IConversation, IUser } from 'shared';
import { compareArrMember } from 'utils';
import { v4 as uuid } from 'uuid';

interface Props {
   onClose: () => any;
}

const ModalCreateConversation: React.FC<Props> = ({ onClose }) => {
   const rootRef = useClickOutside(onClose);
   const { user } = useAppSelector(authSelector);
   const [userFollowing, setUserFollowing] = useState<IUser[]>([]);
   const [userChooseTag, setUserChooseTag] = useState<
      {
         _userId: string;
         _userAvatar: string;
         _userName: string;
      }[]
   >([]);
   const [loading, setLoading] = useState<boolean>(false);
   const dispatch = useAppDispatch();
   const handleCreateConversation = async () => {
      if (userChooseTag.length === 0) {
         return;
      }
      const _member = [
         ...userChooseTag.map((_user) => {
            return {
               _userId: _user._userId,
            };
         }),
         {
            _userId: user?.userId as string,
         },
      ];
      const data = await getDocs(query(collection(db, 'conversations')));

      const conversations = data.docs.map((data) => {
         return {
            ...data.data(),
            _conversationDocId: data.id,
         };
      }) as IConversation[];

      const conversationCreated = conversations.find((_conversation) =>
         compareArrMember(_conversation._member, _member)
      );

      if (conversationCreated) {
         updateDoc(
            doc(
               db,
               'conversations',
               conversationCreated._conversationDocId as string
            ),
            {
               _userDeleted: arrayRemove(user?.userId as string),
            }
         );
         dispatch(selectConversation(conversationCreated));
      } else {
         const newConversation: IConversation = {
            _conversationId: uuid(),
            _lastMessage: null,
            _member: _member,
            _userDeleted: [],
            _createdAt: new Date().toISOString(),
         };
         const docRef = await addDocument('conversations', newConversation);
         dispatch(
            selectConversation({
               ...newConversation,
               _conversationDocId: docRef.id,
            })
         );
      }
      setUserChooseTag([]);
      onClose();
   };

   useEffect(() => {
      if (user) {
         setLoading(true);
         getAllUserFollowing(user.following, user.userId)
            .then((value) => {
               setUserFollowing(value);
               setLoading(false);
            })
            .catch((error) => {
               console.log(error);
               setLoading(false);
            });
      }
   }, [user]);

   useEffect(() => {
      return () => {
         setUserChooseTag([]);
      };
   }, []);

   return (
      <ModalWrap>
         <div
            ref={rootRef}
            className="bg-white max-w-sm w-full rounded-lg overflow-hidden "
         >
            <div className="flex items-center justify-between px-4 h-header-height border-solid border-b border-border-color">
               <button onClick={onClose}>Cancel</button>
               <h4>New Message</h4>
               <button onClick={handleCreateConversation}>Next</button>
            </div>
            <div className="min-h-[40px] flex items-center gap-x-3 ">
               <span className="font-medium pl-4">To: </span>
               <div className="">
                  <ul className="flex items-center flex-wrap gap-3 overflow-auto max-h-18 line-  py-2 pr-4">
                     {userChooseTag.map((_user) => (
                        <li key={_user._userId}>
                           <div className="flex items-center gap-x-1 bg-blue-color text-white px-1 py-1 rounded">
                              <span>{_user._userName}</span>
                              <button
                                 onClick={(e) => {
                                    e.stopPropagation();
                                    setUserChooseTag((_userChoose) =>
                                       [..._userChoose].filter(
                                          (item) =>
                                             item._userId !== _user._userId
                                       )
                                    );
                                 }}
                              >
                                 <IoIosClose className="w-5 h-5" />
                              </button>
                           </div>
                        </li>
                     ))}
                  </ul>
               </div>
            </div>
            <div className="min-h-[280px] max-h-[280px] overflow-y-auto flex justify-center ">
               {loading ? (
                  <Spiner />
               ) : (
                  <ul className="w-full self-start">
                     {userFollowing.map((_user) => {
                        return (
                           <li
                              key={_user.userId}
                              onClick={() => {
                                 const _userExist = userChooseTag.find(
                                    (_userChoose) =>
                                       _userChoose._userId === _user.userId
                                 );
                                 if (_userExist) {
                                    setUserChooseTag((_userChoose) =>
                                       [..._userChoose].filter(
                                          (item) => item !== _userExist
                                       )
                                    );
                                 } else {
                                    setUserChooseTag((_userChoose) => [
                                       ..._userChoose,
                                       {
                                          _userId: _user.userId,
                                          _userAvatar: _user.avatar,
                                          _userName: _user.username,
                                       },
                                    ]);
                                 }
                              }}
                           >
                              <div className="flex items-center gap-x-3 w-full cursor-pointer hover:bg-gray-200 transition-[background-color] px-4 py-2">
                                 <Avatar
                                    src={_user.avatar}
                                    alt={_user.username}
                                 />
                                 <div className="flex flex-col  gap-y-1">
                                    <h4 className="font-bold text-text-color-black">
                                       {_user.fullName}
                                    </h4>
                                    <span className="text-text-color-gray">
                                       {_user.username}
                                    </span>
                                 </div>
                              </div>
                           </li>
                        );
                     })}
                  </ul>
               )}
            </div>
         </div>
      </ModalWrap>
   );
};

export default ModalCreateConversation;
