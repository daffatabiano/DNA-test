import { createSlice } from '@reduxjs/toolkit';

type InitState = {
    id: any;
};

const initialState: InitState = {
    id: [],
};

export const readSlice = createSlice({
    name: 'read',
    initialState,
    reducers: {
        setId: (state, action) => {
            if (action.payload) {
                state.id = state.id.filter((id: any) => id !== action.payload);
                if (state.id) {
                    state.id.push(action.payload);
                }
                console.log(state);
            }
        },
        clearId: (state, action) => {
            if (action.payload) {
                state.id = state.id.filter((id: any) => id === action.payload);
                if (state.id) {
                    state.id = action.payload;
                }
                console.log(state);
            }
        },
    },
});

export const { setId, clearId } = readSlice.actions;
export default readSlice.reducer;
