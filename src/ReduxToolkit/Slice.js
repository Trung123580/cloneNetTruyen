import { createSlice } from '@reduxjs/toolkit';
const userReducer = createSlice({
  name: 'users',
  initialState: {
    storyList: [],
  },
  reducers: {
    addStory: (state, action) => {
      state.storyList.push(action.payload);
    },
    deleteStory: (state, action) => {
      //   state.storyList = action.payload;
    },
  },
});

export const { addStory, deleteStory } = userReducer.actions;
export default userReducer.reducer;
