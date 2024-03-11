import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { waitTwoSeconds } from "../../utils";

export const __addToDo = createAsyncThunk("todos/addToDo", async (payload) => {
  await waitTwoSeconds();
  return payload;
});

export const __deleteToDo = createAsyncThunk("todos/deleteToDo", async (id) => {
  await waitTwoSeconds(); 
  return id;
});

const initialState = {
  list: [],
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.list.push(action.payload);
    },
    deleteTodo: (state, action) => {
      state.list = state.list.filter((todo) => todo.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(__addToDo.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(__deleteToDo.fulfilled, (state, action) => {
        state.list = state.list.filter((todo) => todo.id !== action.payload);
      });
  },
});

export const { __addTodo, __deleteTodo } = todosSlice.actions;
export default todosSlice.reducer;
