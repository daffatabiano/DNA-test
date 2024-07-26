import { createSlice } from '@reduxjs/toolkit';

export const searchbarSlice = createSlice({
    name: 'searchbar',
    initialState: {
        open: false,
        value: '',
    },
    reducers: {
        toggle: (state) => {
            state.open = !state.open;
        },
        setValue: (state, action) => {
            state.value = action.payload;
        },
        clearValue : (state) => {
            state.value = '';
        }
    },
});

export const { toggle, setValue, clearValue } = searchbarSlice.actions;
export default searchbarSlice.reducer;
