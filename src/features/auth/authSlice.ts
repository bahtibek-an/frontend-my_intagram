import { createSlice } from '@reduxjs/toolkit';
import { IUser } from 'shared';
import { RootState } from './../../store/index';
import { setIsLogin, setUser, updateUser } from './authAction';

const initialState: {
   user: IUser | null;
   isLogin: boolean;
} = {
   user: null,
   isLogin: false,
};

const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(setUser, (state, action) => {
            state.user = action.payload;
         })
         .addCase(setIsLogin, (state, action) => {
            state.isLogin = action.payload;
         })
         .addCase(updateUser, (state, action) => {
            state.user = action.payload;
         });
   },
});

export const authReducer = authSlice.reducer;
export const authSelector = (state: RootState) => state.auth;
