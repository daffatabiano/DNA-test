// reducers/index.ts
import { combineReducers } from '@reduxjs/toolkit';
import readSlice from '../features/readSlice';
import searchbarSlice from '../features/searchbarSlice';

const rootReducer = combineReducers({
    read: readSlice,
    searchbar: searchbarSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
