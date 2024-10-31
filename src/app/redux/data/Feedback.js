// FeedBack.js
export const updateLikeCountReducer = (state, action) => {
  const { id } = action.payload;
  const topic = state.items.find((item) => item.id === id);
  if (topic) {
    topic.dislike_count = 0;
    topic.like_count += 1;
  }
};

export const updateDislikeCountReducer = (state, action) => {
  const { id } = action.payload;
  const topic = state.items.find((item) => item.id === id);
  if (topic) {
    topic.like_count = 0;
    topic.dislike_count += 1;
  }
};

const findCommentById = (state, id) => {
  const topic = state.items.find((item) =>
    item.comments.some((comment) => comment.id === id)
  );
  return topic ? topic.comments.find((comment) => comment.id === id) : null;
};

export const updateLikeCommentFunction = (state, action) => {
  const comment = findCommentById(state, action.payload.id);
  if (comment) {
    comment.like_count += 1;
    comment.dislike_count = 0;
  }
};

export const updateDislikeCommentFunction = (state, action) => {
  const comment = findCommentById(state, action.payload.id);
  if (comment) {
    comment.like_count = 0;
    comment.dislike_count += 1;
  }
};
