// store.ts
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // default to localStorage for web
import { createWrapper } from 'next-redux-wrapper';
import rootReducer from './reducers'; // Pastikan Anda memiliki rootReducer

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const makeStore = () =>
    configureStore({
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: false,
            }),
    });

export const wrapper = createWrapper(makeStore);
export const persistor = persistStore(makeStore());
