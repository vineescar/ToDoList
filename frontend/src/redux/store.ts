import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./slices/todoSlice"; // ✅ Make sure you import the reducer
import themeReducer from './slices/themeSlice';

const store = configureStore({
  reducer: {
    todos: todoReducer, // ✅ Ensure this is added correctly
    theme: themeReducer,
  },
});

// ✅ Define correct types for RootState and Dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
