import { createSlice } from '@reduxjs/toolkit';
import { IConversation, LoadingState } from 'shared';
import { RootState } from 'store';
import { fetchLoadingActions, selectConversation } from './conversationActions';

interface State extends LoadingState {
   conversations: IConversation[];
   currentConversation: IConversation | null;
}

const initialState: State = {
   error: null,
   loading: false,
   conversations: [],
   currentConversation: null,
};

const conversationsSlice = createSlice({
   name: 'conversations',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(fetchLoadingActions.pending, (state) => {
            state.loading = true;
         })
         .addCase(fetchLoadingActions.fulfilled, (state, action) => {
            state.conversations = action.payload;
            state.loading = false;
         })
         .addCase(fetchLoadingActions.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
         })
         .addCase(selectConversation, (state, action) => {
            state.currentConversation = action.payload;
         });
   },
});

export const conversationSelector = (state: RootState) => state.conversations;
export const conversationReducer = conversationsSlice.reducer;
