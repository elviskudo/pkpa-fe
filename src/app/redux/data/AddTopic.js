import { generateUUID, generateID } from "@/libs/Utils";

export const insertReducer = (state, action) => {
  const { title, content, image_url } = action.payload;

  const newItem = {
    id: state.items.length + 1,
    uuid: generateUUID(),
    title: title,
    content: content,
    image_url: image_url,
    user: {
      id: generateID(),
      name: "Jason Bertho",
      email: "Jason.Bertho@example.com",
      phone: "+628755678765",
    },
    comments: [],
    like_count: 0,
    dislike_count: 0,
    topic_archived: "false",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  state.items.push(newItem);
};
