/** @format */

import { createSlice } from "@reduxjs/toolkit";
import { publishPosts } from "../extraReducer";
import { Flag, FlashOnTwoTone } from "@mui/icons-material";
const initialState = {
  loading: null,
  error: null,
  postLoading: null,
};

const postsSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(publishPosts.pending, (state, action) => {
        state.loading = true;
        state.postLoading = true;
      })
      .addCase(publishPosts.fulfilled, (state, action) => {
        state.postLoading = false;
      })
      .addCase(publishPosts.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});
export const {} = postsSlice.actions;
export default postsSlice.reducer;
