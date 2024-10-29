"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const generateUUID = () => {
  return `${Math.floor(Math.random() * 10000)}-${Math.floor(
    Math.random() * 10000
  )}-${Math.floor(Math.random() * 10000)}`;
};

const generateID = () => {
  return `${Math.floor(Math.random() * 10000)}-${Math.floor(
    Math.random() * 10000
  )}-${Math.floor(Math.random() * 10000)}`;
};

export const forumSlice = createSlice({
  name: "forum",
  initialState,
  reducers: {
    insert: (state, action) => {
      const newItem = {
        id: state.items.length + 1,
        uuid: generateUUID(),
        title: action.payload.title,
        content: action.payload.content,
        discussionFor: action.payload.discussionFor,
        image_url: action.payload.image_url,
        user: {
          id: generateID(),
          name: "Jason Bertho",
          email: "Jason.Bertho@example.com",
          phone: "+628755678765",
        },
        comments: [],
        like_count: 0,
        dislike_count: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      state.items.push(newItem);
    },
    addComment: (state, action) => {
      const { itemId, content, userId } = action.payload;
      const item = state.items.find((item) => item.id === itemId);
      if (item) {
        const newComment = {
          id: generateID(),
          uuid: generateUUID(),
          content: content,
          user: {
            id: userId,
            name: "John Doe",
            email: "john.doe@example.com",
            phone: "+628755678765",
          },
          like_count: 0,
          dislike_count: 0,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        console.log("Add Comment :", newComment);
        item.comments.push(newComment);
      }
    },
  },
});

export const { insert, addComment } = forumSlice.actions;
export default forumSlice.reducer;
