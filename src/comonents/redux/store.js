/** @format */

import { configureStore } from "@reduxjs/toolkit";
import baseStore from "./extraReducer";

const store = configureStore({
  reducer: {
    base: baseStore,
  },
});
export default store;
