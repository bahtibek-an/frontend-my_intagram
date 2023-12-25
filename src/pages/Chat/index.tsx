import { authSelector } from 'features/auth';
import {
   conversationSelector,
   selectConversation,
   subscribeConversations,
} from 'features/conversations';
import { useAppDispatch, useAppSelector, useView } from 'hooks';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatView from './components/ChatView';
import Sidebar from './components/Sidebar';

const Chat = () => {
   const { user } = useAppSelector(authSelector);
   const { currentConversation } = useAppSelector(conversationSelector);
   const dispatch = useAppDispatch();
   const { width } = useView();
   const navigate = useNavigate();

   useEffect(() => {
      if (user?.userId && user.username) {
         dispatch(subscribeConversations(user.userId));
      }
   }, [user, dispatch]);

   useEffect(() => {
      return () => {
         dispatch(selectConversation(null));
      };
   }, [dispatch]);

   useEffect(() => {
      if (currentConversation) {
         navigate(`/chat/${currentConversation._conversationDocId}`);
      }
   }, [currentConversation, navigate]);

   return (
      <div className="flex  w-full my-6 h-[calc(100vh_-_(var(--header-height)_+_2_*_24px))]">
         <div className="flex w-full bg-white rounded border border-solid border-border-color">
            {width < 1024 && !currentConversation ? (
               <div className=" flex-shrink-0 w-full">
                  <Sidebar />
               </div>
            ) : width < 1024 && currentConversation ? (
               <div className="flex-1 w-full ">
                  <ChatView />
               </div>
            ) : null}
            {width >= 1024 && (
               <>
                  <div className="w-[350px] flex-shrink-0">
                     <Sidebar />
                  </div>
                  <div className="flex-1 w-full ">
                     <ChatView />
                  </div>
               </>
            )}
         </div>
      </div>
   );
};

export default Chat;
