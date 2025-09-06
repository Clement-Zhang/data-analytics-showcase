import { getSummary } from '../services/showcase';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const setAnalytics = createAsyncThunk('analytics/set', async () => {
    return await getSummary();
});

export function selectAnalytics(state) {
    return state.analytics;
}

const analyticsSlice = createSlice({
    name: 'analytics',
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(setAnalytics.fulfilled, (state, action) => {
            state.analytics = action.payload;
        });
    },
});

export default analyticsSlice.reducer;