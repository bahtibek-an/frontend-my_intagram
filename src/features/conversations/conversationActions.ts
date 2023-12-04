import { createAction, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from 'lib/firebase';
import { createLoadingActions, IConversation } from 'shared';

export const fetchLoadingActions =
   createLoadingActions<IConversation[]>('fetchConversations');

export const subscribeConversations =
   (userId: string) => async (dispatch: Dispatch<PayloadAction<any>>) => {
      dispatch(fetchLoadingActions.pending());
      if (userId) {
         const q = query(collection(db, 'conversations'));
         onSnapshot(q, (querySnapshot) => {
            const conversations = querySnapshot.docs
               .map((doc) => {
                  return {
                     ...(doc.data() as IConversation),
                     _conversationDocId: doc.id,
                  };
               })
               .filter((conversation) => {
                  const isMember = conversation._member.some(
                     (_member) => _member._userId === userId
                  );
                  const isDeleted = conversation._userDeleted.some(
                     (_userId) => _userId === userId
                  );
                  return isMember && !isDeleted;
               })
               .sort((a, b) => {
                  if (a._lastMessage && b._lastMessage) {
                     return b._lastMessage._createAt.localeCompare(
                        a._lastMessage._createAt
                     );
                  }
                  return b._createdAt.localeCompare(a._createdAt);
               });
            dispatch(fetchLoadingActions.fulfilled(conversations));
         });
      }
   };

export const selectConversation = createAction<IConversation | null>(
   'conversations/selectConversation'
);
