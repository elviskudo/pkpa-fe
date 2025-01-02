"use client";
import { configureStore } from "@reduxjs/toolkit";
import { forumReducer } from "./features/forumSlice";

export const store = configureStore({
  reducer: {
    forum: forumReducer,
  },
});

export default store;