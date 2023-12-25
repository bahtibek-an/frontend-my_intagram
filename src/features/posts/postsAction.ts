import { createAction, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from 'lib/firebase';
import { createLoadingActions, IPost } from 'shared';

export const fetchLoadingActions = createLoadingActions<IPost[]>('fetchLists');

export const subscribePosts = (username?: string) => {
   return async (dispatch: Dispatch<PayloadAction<any>>) => {
      dispatch(fetchLoadingActions.pending());

      const q = query(collection(db, 'posts'));
      onSnapshot(q, (querySnapshot) => {
         const posts = querySnapshot.docs
            .map((doc) => {
               return {
                  ...(doc.data() as IPost),
                  docId: doc.id,
               };
            })
            .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
         dispatch(fetchLoadingActions.fulfilled(posts));
      });
   };
};

export const unmountPosts = createAction('posts/unmountPosts');
