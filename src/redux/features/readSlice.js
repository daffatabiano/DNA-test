const readSlice = {
    name: 'read',
    initialState: {
        data: [],
    },
    reducers: {
        read: (state, action) => {
            state.data = action.payload;
        },

        reset: (state) => {
            state.data = [];
        },
    },
};

export const { read, reset } = readSlice.actions;
export default readSlice.reducer;
