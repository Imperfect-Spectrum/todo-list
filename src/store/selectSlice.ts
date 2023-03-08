import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectType {
  selectValue: string;
}

const initialState: SelectType = {
  selectValue: 'All',
};

const selectSlice = createSlice({
  name: 'selectValue',
  initialState,
  reducers: {
    setSelectValue: (state, action: PayloadAction<SelectType>) => {
      // eslint-disable-next-line no-param-reassign
      state.selectValue = action.payload.selectValue;
    },
  },
});

export const { setSelectValue } = selectSlice.actions;
export default selectSlice.reducer;
