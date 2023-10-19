import { createSlice } from '@reduxjs/toolkit';
const ApiCategory = createSlice({
  name: 'categoryApi',
  initialState: {
    response: '',
    description: '',
    nameStory: '',
    apiTop: '',
  },
  reducers: {
    callApi: (state, action) => {
      state.response = action.payload;
    },
    descriptionStory: (state, action) => {
      state.description = action.payload;
    },
    nameGenres: (state, action) => {
      state.nameStory = action.payload;
    },
    apiRanks: (state, action) => {
      state.apiTop = action.payload;
    },
    // kiểm tra có data chưa nếu có render-page
  },
});
export const { callApi, descriptionStory, nameGenres, apiRanks } = ApiCategory.actions;
export default ApiCategory.reducer;
