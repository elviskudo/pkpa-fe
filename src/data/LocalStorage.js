// localStorage.js
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("forumState");
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("forumState", serializedState);
  } catch (err) {
    // Handle errors
  }
};
