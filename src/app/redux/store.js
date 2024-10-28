import { configureStore } from "@reduxjs/toolkit";
import forumReducer from "@/app/redux/features/forumSlice";

const store = configureStore({
  reducer: {
    forum: forumReducer,
  },
});

console.log(forumReducer);
export default store;
