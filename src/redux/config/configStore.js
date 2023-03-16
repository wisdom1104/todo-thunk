import { configureStore } from "@reduxjs/toolkit";
import todos from "../modules/todosSlice";

const store = configureStore({
  reducer: { todos: todos },
  devTools: process.env.NODE_ENV === "developmetns" ? false : true,
});

export default store;
