import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const organizeSlice = createSlice({
    name: 'organize',
    initialState: {
        sort: { sortBy: 'fname', sortAscending: true },
        changed: false,
    },
    reducers: {
        setSort: (state, action) => {
            state.sort = action.payload;
            state.changed = true;
        },
        setSorted: (state) => {
            state.changed = false;
        },
    },
});

export const { setSort, setSorted } = organizeSlice.actions;

export default organizeSlice.reducer;
