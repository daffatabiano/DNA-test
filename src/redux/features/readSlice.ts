import { createSlice } from '@reduxjs/toolkit';

type InitState = {
    id: string;
};

const initialState: InitState = {
    id: '',
};

export const readSlice = createSlice({
    name: 'read',
    initialState,
    reducers: {
        setId: (state, action) => {
            state.id = action.payload;
        },
        clearId: (state) => {
            state.id = '';
        },
    },
});

export const { setId, clearId } = readSlice.actions;
export default readSlice.reducer;
