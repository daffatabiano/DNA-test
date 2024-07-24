import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitState = {
    id: any[];
};

const initialState: InitState = {
    id: [],
};

export const readSlice = createSlice({
    name: 'read',
    initialState,
    reducers: {
        setId: (state, action: PayloadAction<any>) => {
            if (action.payload) {
                const existingUrl = state.id.find(
                    (url) => url.url === action.payload.url
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
        clearId: (state, action: PayloadAction<any>) => {
            state.id = state.id.filter((id) => id !== action.payload);
        },
    },
});

export const { setId, clearId } = readSlice.actions;
export default readSlice.reducer;
