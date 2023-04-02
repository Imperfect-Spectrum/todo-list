import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface List {
  sortName: string;
}

interface SortType {
  sortValue: string;
  sortList: List[];
}

const initialState: SortType = {
  sortValue: '',
  sortList: [],
};

const sortSlice = createSlice({
  name: 'sorts',
  initialState,
  reducers: {
    setValueSort: (state, action: PayloadAction<SortType>) => {
      state.sortValue = action.payload.sortValue;
    },

    addNewList: (state, action: PayloadAction<List>) => {
      state.sortList.push(action.payload);
    },

    deleteList: (state, action: PayloadAction<string>) => {
      state.sortList = state.sortList.filter((list) => list.sortName !== action.payload);
      state.sortValue = '';
    },
  },
});

export const { setValueSort, addNewList, deleteList } = sortSlice.actions;
export default sortSlice.reducer;
