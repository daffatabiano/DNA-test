// reducers/index.ts
import { combineReducers } from '@reduxjs/toolkit';
import readSlice from '../features/readSlice';

const rootReducer = combineReducers({
    read: readSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
