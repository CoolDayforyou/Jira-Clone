import { RootState } from "../../app/store";
import {
  ITodo,
  ITodoState,
  FetchStatusEnum,
  TodoStatusEnum,
  IExtendedTodo,
} from "../../app/types";
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  EntityId,
  PayloadAction,
} from "@reduxjs/toolkit";

const todosAdapter = createEntityAdapter<IExtendedTodo>();
const initialState: ITodoState = todosAdapter.getInitialState({
  status: FetchStatusEnum.IDLE,
  errorMessage: "",
});

export const fetchTodos = createAsyncThunk<
  IExtendedTodo[],
  void,
  { rejectValue: string }
>("todos/fetchTodos", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    return response.json();
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const updateTodo = createAsyncThunk<
  ITodo,
  EntityId,
  { rejectValue: string }
>("todos/updateTodo", async (todoId, { rejectWithValue }) => {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${todoId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({ completed: true }),
      },
    );
    return response.json();
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    toggleTodo(state, action: PayloadAction<EntityId>) {
      const id = action.payload;
      const todo = state.entities[id];

      if (todo && todo.progress === TodoStatusEnum.TO_DO) {
        todo.progress = TodoStatusEnum.IN_PROGRESS;
      } else if (todo && todo.progress === TodoStatusEnum.IN_PROGRESS) {
        todo.progress = TodoStatusEnum.DONE;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = FetchStatusEnum.PENDING;
      })
      .addCase(
        fetchTodos.fulfilled,
        (state, action: PayloadAction<IExtendedTodo[]>) => {
          const updatedTodos = action.payload.map((todo) => ({
            ...todo,
            completed: false,
            progress: TodoStatusEnum.TO_DO,
          }));
          todosAdapter.addMany(state, updatedTodos);
          state.status = FetchStatusEnum.IDLE;
        },
      )
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = FetchStatusEnum.REJECTED;
        state.errorMessage = action.payload as string;
      });
    builder
      .addCase(updateTodo.fulfilled, (state, action) => {
        const { id, completed } = action.payload;
        todosAdapter.updateOne(state, { id, changes: { completed } });
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.errorMessage = action.payload as string;
      });
  },
});

export const { toggleTodo } = todosSlice.actions;

export const {
  selectAll: selectAllTodos,
  selectIds: selectTodosIds,
  selectById: selectTodoById,
} = todosAdapter.getSelectors((state: RootState) => state.todos);

export default todosSlice.reducer;
