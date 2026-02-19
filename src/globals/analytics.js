import { createSlice } from '@reduxjs/toolkit';

export function selectAnalytics(state) {
    return state.analytics;
}

const analyticsSlice = createSlice({
    name: 'analytics',
    initialState: {},
    reducers: {
        setAnalytics: (_, action) => action.payload,
    },
});

export const { setAnalytics } = analyticsSlice.actions;

export default analyticsSlice.reducer;
