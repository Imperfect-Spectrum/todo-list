import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  deleted: boolean;
  sort: string;
}
interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = {
  todos: [],
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
    },

    deleteTodo: (state, action: PayloadAction<number>) => {
      const deleteTodo = state.todos.find((todo) => todo.id === action.payload);
      if (deleteTodo) {
        deleteTodo.deleted = !deleteTodo.deleted;
      }
    },
    endDeleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    completeTodo(state, action: PayloadAction<number>) {
      const completeTodo = state.todos.find((todo) => todo.id === action.payload);
      if (completeTodo) {
        completeTodo.completed = !completeTodo.completed;
      }
    },
    deleteTodoList: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo.sort !== action.payload);
    },
  },
});

export const { addTodo, completeTodo, deleteTodo, endDeleteTodo, deleteTodoList } = todosSlice.actions;
export default todosSlice.reducer;
