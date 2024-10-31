import { generateUUID, generateID } from "@/libs/Utils";

export const addCommentReducer = (state, action) => {
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
    item.comments.push(newComment);
  }
};
