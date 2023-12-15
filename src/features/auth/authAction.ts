import { createAction } from '@reduxjs/toolkit';
import { IUser } from 'shared';

export const setUser = createAction<IUser | null>('auth/setUser');
export const setIsLogin = createAction<boolean>('auth/setIsLogin');
export const updateUser = createAction<IUser>('auth/updateUser');
