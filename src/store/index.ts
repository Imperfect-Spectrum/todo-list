import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';
import sortReducer from './sortSlice';
import selectSlice from './selectSlice';

export const store = configureStore({
  reducer: {
    todos: todoReducer,
    sorts: sortReducer,
    setSelect: selectSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
