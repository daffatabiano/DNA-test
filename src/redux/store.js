import { configureStore } from '@reduxjs/toolkit';
import readSlice from './features/readSlice';

const store = configureStore({
    read: readSlice,
});

export default store;
