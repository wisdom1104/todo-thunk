import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: 1, // id는 모두 고유값이어야 합니다.
    title: "리액트",
    content: "할만 했었지.......",
    isDone: false,
  },
  {
    id: 2, // id는 모두 고유값이어야 합니다.
    title: "리덕스",
    content: "울고 말았지......",
    isDone: true,
  },
];

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    AddTodo: (state, action) => {
      const addTodo = {
        id: Date.now(),
        title: action.payload.title,
        content: action.payload.content,
        isDone: false,
      };
      return [...state, addTodo];
    },
    RemoveTodo: (state, action) => {
      const removeTodo = state.filter((item) => {
        return item.id !== action.payload.id;
      });
      return removeTodo;
    },
    CompletTodo: (state, action) => {
      const completTodo = state.map((item) => {
        return item.id === action.payload.id
          ? { ...item, isDone: !item.isDone }
          : item;
      });
      return completTodo;
    },
    EditTodo: (state, action) => {
      const { id, editTitle, editContent } = action.payload;
      // console.log(id, editTitle, editContent);
      return state.map((item) =>
        item.id === id
          ? { ...item, title: editTitle, content: editContent }
          : item
      );
    },
  },
});
export const { AddTodo, RemoveTodo, CompletTodo, EditTodo } =
  todosSlice.actions;
export default todosSlice.reducer;
