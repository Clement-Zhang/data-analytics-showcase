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
    console.log(getState())
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

export const sort = createAsyncThunk('users/sort', async (spec, thunkAPI) => {
    const { getState } = thunkAPI;
    return getState().users.toSorted((prev, next) =>
        (spec.sortAscending && prev[spec.sortBy] < next[spec.sortBy]) ||
        (!spec.sortAscending && prev[spec.sortBy] > next[spec.sortBy])
            ? -1
            : 1
    );
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
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(setUsers.fulfilled, (state, action) => {
            state = action.payload;
        });
    },
});

export const { setFlag } = usersSlice.actions;

export default usersSlice.reducer;
