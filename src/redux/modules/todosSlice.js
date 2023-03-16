import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//조회
export const __getTodos = createAsyncThunk(
  "getTodos",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(`${process.env.REACT_APP_SERVER_KEY}/todos`);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 추가
export const __addTodos = createAsyncThunk("addTodos", async (newTodo) => {
  await axios.post(`${process.env.REACT_APP_SERVER_KEY}/todos`, newTodo);
});
//삭제
export const __deleteTodo = createAsyncThunk("deleteTodo", async (id) => {
  await axios.delete(`${process.env.REACT_APP_SERVER_KEY}/todos/${id}`);
});
//취소||완료
export const __completTodo = createAsyncThunk(
  "completTodo",
  async (payload) => {
    await axios.patch(
      `${process.env.REACT_APP_SERVER_KEY}/todos/${payload.id}`,
      {
        isDone: payload.isDone,
      }
    );
  }
);
//수정
export const __editTodo = createAsyncThunk("editTodo", async (payload) => {
  await axios.patch(`${process.env.REACT_APP_SERVER_KEY}/todos/${payload.id}`, {
    title: payload.title,
    content: payload.content,
  });
});

const initialState = {
  todos: [],
  isLoading: false,
  error: null,
};

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: {
    [__getTodos.pending]: (state) => {
      state.isLoading = true;
    },
    [__getTodos.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.todos = action.payload;
    },
    [__getTodos.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {} = todosSlice.actions;
export default todosSlice.reducer;

// const initialState = [
//   {
//     id: 1, // id는 모두 고유값이어야 합니다.
//     title: "리액트",
//     content: "할만 했었지.......",
//     isDone: false,
//   },
//   {
//     id: 2, // id는 모두 고유값이어야 합니다.
//     title: "리덕스",
//     content: "울고 말았지......",
//     isDone: true,
//   },
// ];

// const todosSlice = createSlice({
//   name: "todos",
//   initialState,
//   reducers: {
//     AddTodo: (state, action) => {
//       const addTodo = {
//         id: Date.now(),
//         title: action.payload.title,
//         content: action.payload.content,
//         isDone: false,
//       };
//       return [...state, addTodo];
//     },
//     RemoveTodo: (state, action) => {
//       const removeTodo = state.filter((item) => {
//         return item.id !== action.payload.id;
//       });
//       return removeTodo;
//     },
//     CompletTodo: (state, action) => {
//       const completTodo = state.map((item) => {
//         return item.id === action.payload.id
//           ? { ...item, isDone: !item.isDone }
//           : item;
//       });
//       return completTodo;
//     },
//     EditTodo: (state, action) => {
//       const { id, editTitle, editContent } = action.payload;
//       // console.log(id, editTitle, editContent);
//       return state.map((item) =>
//         item.id === id
//           ? { ...item, title: editTitle, content: editContent }
//           : item
//       );
//     },
//   },
// });
// export const { AddTodo, RemoveTodo, CompletTodo, EditTodo } =
//   todosSlice.actions;
// export default todosSlice.reducer;
