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
    removeComment: (state, action) => {
      const { topicId, commentId } = action.payload;
      const topic = state.items.find((item) => item.id === topicId);
      if (topic) {
        topic.comments = topic.comments.filter(
          (comment) => comment.id !== commentId
        );
      }
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
  removeComment,
  archiveTopic,
} = forumSlice.actions;
export default forumSlice.reducer;
