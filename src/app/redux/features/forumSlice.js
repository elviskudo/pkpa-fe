import { createSlice } from "@reduxjs/toolkit";
import { insertReducer } from "../data/AddTopic";
import {
  updateLikeCountReducer,
  updateDislikeCountReducer,
  updateLikeCommentFunction,
  updateDislikeCommentFunction,
} from "../data/Feedback";
import { addCommentReducer } from "../data/Comment";

const initialState = {
  items: [],
};

const forumSlice = createSlice({
  name: "forum",
  initialState,
  reducers: {
    insert: insertReducer,
    updateLikeCount: updateLikeCountReducer,
    updateDislikeCount: updateDislikeCountReducer,
    commentLiked: updateLikeCommentFunction,
    commentDisliked: updateDislikeCommentFunction,
    addComment: addCommentReducer,
  },
});

export const {
  insert,
  addComment,
  updateLikeCount,
  updateDislikeCount,
  commentLiked,
  commentDisliked,
} = forumSlice.actions;
export default forumSlice.reducer;
