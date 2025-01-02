"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  discussionFor: "",
  title: "",
  content: "",
  forumList: [],
  imageUpload: null,
};

export const forumSlice = createSlice({
  name: "forum",
  initialState,
  reducers: {
    show: (state) => {
      return state;
    },
    insert: (state, action) => {
      const { discussionFor, title, content } = action.payload;
      state.forumList.push({
        discussionFor,
        title,
        content,
      });
    },
    delete: (state) => {
      return state;
    },
  },
});

export const { insert } = forumSlice.actions;
export default forumSlice.reducer;
