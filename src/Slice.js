import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mobile: false,
  addPostIsOpen: false,
  posts: [],
  selectedProfile: {},
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    SetScreen: (state, action) => {
      state.mobile = action.payload.mobile;
    },
    setAddPostModal: (state, action) => {
      state.addPostIsOpen = action.payload.addPostIsOpen;
    },
    SetPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    SetSelectedProfile: (state, action) => {
      state.selectedProfile = action.payload.selectedProfile;
    },
  },
});

export const {
  SetScreen,
  setAddPostModal,
  SetPosts,
  SetSelectedProfile,
} = appSlice.actions;

export const selectMobile = (state) => state.app.mobile;
export const selectAddPostIsOpen = (state) => state.app.addPostIsOpen;
export const selectPosts = (state) => state.app.posts;
export const SelectProfile = (state) => state.app.selectedProfile;

export default appSlice.reducer;