/** @format */

import { create } from "@mui/material/styles/createTransitions";
import { createSlice } from "@reduxjs/toolkit";
import { UserLogin, createUser } from "../extraReducer";
const initialState = {
  loading: null,
  error: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    errorMessage: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
    // this is comment for redux
      .addCase(UserLogin.pending, (state, action) => {
        state.loading = true;
        // this is comment for redux
      })
      .addCase(UserLogin.fulfilled, (state, action) => {
        state.loading = true;
      })
      .addCase(UserLogin.rejected, (state, action) => {
        // this is comment for redux
        state.error = action.error.message;
      });
    builder
      .addCase(createUser.pending, (state, actio) => {
        state.loading = true;
      })
      // this is comment for redux
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createUser.rejected, (state, action) => {
        // this is comment for redux
        state.error = action.error.message;
      });
  },
});
export const { errorMessage } = loginSlice.actions;
export default loginSlice.reducer;
