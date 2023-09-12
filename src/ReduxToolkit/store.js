import { configureStore } from '@reduxjs/toolkit';
import userReducer from './Slice';
import ApiCategory from './callApiRedux';
const store = configureStore({
  reducer: {
    user: userReducer,
    api: ApiCategory,
  },
});
export default store;
