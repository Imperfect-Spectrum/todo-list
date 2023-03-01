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
  },
});

export const { setValueSort, addNewList } = sortSlice.actions;
export default sortSlice.reducer;
