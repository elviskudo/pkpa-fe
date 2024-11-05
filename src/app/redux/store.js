import { configureStore } from "@reduxjs/toolkit";
import forumReducer from "@/app/redux/features/forumSlice";
import { loadState, saveState } from "@/data/LocalStorage";

const preloadedState = loadState();

const store = configureStore({
  reducer: {
    forum: forumReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
