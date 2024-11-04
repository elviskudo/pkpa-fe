import { createSlice } from "@reduxjs/toolkit";
import { insertReducer } from "../data/AddTopic";
import { archiveTopicReducer } from "../data/TopicArchive";
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
    archiveTopic: archiveTopicReducer,
    removeTopic: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const {
  insert,
  addComment,
  updateLikeCount,
  updateDislikeCount,
  commentLiked,
  commentDisliked,
  removeTopic,
  archiveTopic,
} = forumSlice.actions;
export default forumSlice.reducer;
