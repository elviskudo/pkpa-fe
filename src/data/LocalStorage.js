export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("DataForum");
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("DataForum", serializedState);
  } catch (err) {    
    console.error("Error Saving:", err);
  }
};
