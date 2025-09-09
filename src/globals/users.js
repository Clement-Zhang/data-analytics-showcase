import {
    addUser,
    getUsers,
    editUser,
    deleteUser,
    reset,
} from '../services/showcase';
import { setAnalytics } from './analytics';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const setUsers = createAsyncThunk('users/set', async (_, thunkAPI) => {
    const { dispatch, getState } = thunkAPI;
    dispatch(setAnalytics());
    return await getUsers();
});

export function selectUsers(state) {
    return state.users;
}

export const add = createAsyncThunk('users/add', async (user, thunkAPI) => {
    const { dispatch } = thunkAPI;
    await addUser(user);
    dispatch(setUsers());
});

export const edit = createAsyncThunk('users/edit', async (user, thunkAPI) => {
    const { dispatch } = thunkAPI;
    await editUser(user);
    dispatch(setUsers());
});

export const del = createAsyncThunk('users/delete', async (id, thunkAPI) => {
    const { dispatch } = thunkAPI;
    await deleteUser(id);
    dispatch(setUsers());
});

export const wipe = createAsyncThunk('users/reset', async (_, thunkAPI) => {
    const { dispatch } = thunkAPI;
    await reset();
    dispatch(setUsers());
});

const usersSlice = createSlice({
    name: 'users',
    initialState: [],
    reducers: {
        sort: (state, action) => {
            const { sortBy, sortAscending } = action.payload;
            state.sort((prev, next) =>
                sortAscending
                    ? prev[sortBy] > next[sortBy]
                        ? 1
                        : -1
                    : prev[sortBy] < next[sortBy]
                    ? 1
                    : -1
            );
        },
    },
    extraReducers: (builder) => {
        builder.addCase(setUsers.fulfilled, (state, action) => {
            state.length = 0;
            state.push(...action.payload);
        });
    },
});

export const { sort } = usersSlice.actions;

export default usersSlice.reducer;
