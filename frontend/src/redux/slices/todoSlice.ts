import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../config"; 

interface Todo {
  id: number;
  text: string;
  description: string;
  completed: boolean;
  dateAdded: string;
  time?: string;
  taskDate: string;
  severity: "Low" | "Medium" | "High" | "Critical";
}

interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}

const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null,
};

// Async Thunks
export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await axios.get(`${API_URL}/api/todos`);
  return response.data;
});

export const addTodo = createAsyncThunk("todos/addTodo", async (todo: Omit<Todo, "id" | "dateAdded" | "completed">) => {
  const response = await axios.post(`${API_URL}/api/todos`, todo);
  return response.data;
});

export const toggleTodo = createAsyncThunk("todos/toggleTodo", async (id: number) => {
  await axios.patch(`${API_URL}/api/todos/${id}/toggle`);
  return id;
});

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id: number) => {
  await axios.delete(`${API_URL}/api/todos/${id}`);
  return id;
});

// Slice
const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
        state.todos = action.payload;
        state.loading = false;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch todos";
      })
      .addCase(addTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.todos.push(action.payload);
      })
      .addCase(toggleTodo.fulfilled, (state, action: PayloadAction<number>) => {
        const todo = state.todos.find((t) => t.id === action.payload);
        if (todo) {
          todo.completed = !todo.completed;
        }
      })
      .addCase(deleteTodo.fulfilled, (state, action: PayloadAction<number>) => {
        state.todos = state.todos.filter((t) => t.id !== action.payload);
      });
  },
});

export default todoSlice.reducer;
