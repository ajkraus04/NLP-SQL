import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './reducers/dataSlice.js';

// we are adding composeWithDevTools here to get easy access to the Redux dev tools
const store = configureStore({
  reducer: {
    data: dataReducer,
  },
});

export default store;
