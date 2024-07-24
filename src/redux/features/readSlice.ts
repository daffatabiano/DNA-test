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
                const existingUrl = state.id.find(
                    (url: any) => url.url === action.payload.url
                );
                if (!existingUrl) {
                    state.id.push(action.payload);
                } else {
                    console.log(
                        `URL ${action.payload.url} sudah ada di state.id.`
                    );
                }
            }
        },
        clearId: (state, action) => {
            if (action.payload) {
                state.id = state.id.filter((id: any) => id === action.payload);
                if (state.id) {
                    state.id = action.payload;
                }
            }
        },
    },
});

export const { setId, clearId } = readSlice.actions;
export default readSlice.reducer;
