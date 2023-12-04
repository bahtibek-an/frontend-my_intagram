import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from 'features/auth';
import { conversationReducer } from 'features/conversations';
import { postsReducer } from 'features/posts';
export const store = configureStore({
   reducer: {
      auth: authReducer,
      posts: postsReducer,
      conversations: conversationReducer,
   },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
