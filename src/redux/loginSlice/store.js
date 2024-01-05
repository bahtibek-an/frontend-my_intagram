/** @format */

import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./loginSlice";
import postsSlice from "../postsSlice/postsSlice";

const store = configureStore({
  reducer: {
    login: loginSlice,
    posts: postsSlice,
  },
});
export default store;
