export const archiveTopicReducer = (state, action) => {
  const { topicId, archived } = action.payload;
  const topicIndex = state.items.findIndex((item) => item.id === topicId);

  if (topicIndex !== -1) {
    state.items[topicIndex] = {
      ...state.items[topicIndex],
      topic_archived: archived,
      updated_at: new Date().toISOString(),
    };
  }
};
