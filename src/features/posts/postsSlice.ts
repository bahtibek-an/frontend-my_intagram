import { createSlice } from '@reduxjs/toolkit';
import { IPost, LoadingState } from 'shared';
import { RootState } from 'store';
import { fetchLoadingActions, unmountPosts } from './postsAction';

interface State extends LoadingState {
   posts: IPost[];
}

const initialState: State = {
   error: null,
   loading: false,
   posts: [],
};

const postsSlice = createSlice({
   name: 'posts',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(fetchLoadingActions.pending, (state) => {
            state.loading = true;
         })
         .addCase(fetchLoadingActions.fulfilled, (state, { payload }) => {
            state.posts = payload;
            state.loading = false;
         })
         .addCase(fetchLoadingActions.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
         })
         .addCase(unmountPosts, (state) => {
            state.posts = [];
         });
   },
});

export const postsSelector = (state: RootState) => state.posts;
export const postsReducer = postsSlice.reducer;
