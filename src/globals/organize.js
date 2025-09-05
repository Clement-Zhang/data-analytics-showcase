import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const organizeSlice = createSlice({
    name: 'organize',
    initialState: { sortBy: 'fname', sortAscending: true, changed: false },
    reducers: {
        setSort: (state, action) => {
            state = { ...state, ...action.payload, changed: true };
        },
        setSorted: (state) => {
            state = { ...state, changed: false };
        }
    },
});

export const { setSort, setSorted } = organizeSlice.actions;

export default organizeSlice.reducer;