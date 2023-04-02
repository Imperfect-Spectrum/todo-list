import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import todoReducer from './todoSlice';
import sortReducer from './sortSlice';
import selectSlice from './selectSlice';

const rootReducer = combineReducers({
  todos: todoReducer,
  sorts: sortReducer,
  setSelect: selectSlice,
});

const preloadedState = JSON.parse(localStorage.getItem('state') || '{}');

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState,
});

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem('state', JSON.stringify(state));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
