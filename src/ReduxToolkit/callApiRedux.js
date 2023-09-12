import { createSlice } from '@reduxjs/toolkit';
const ApiCategory = createSlice({
  name: 'categoryApi',
  initialState: {
    response: '',
  },
  reducers: {
    callApi: (state, action) => {
      state.response = action.payload;
    },
  },
});
export const { callApi } = ApiCategory.actions;
export default ApiCategory.reducer;
