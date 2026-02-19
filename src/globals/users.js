import {
    addUser,
    editUser,
    deleteUser,
    reset,
} from '../services/showcase.service';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export function selectUsers(state) {
    return state.users;
}

export const add = createAsyncThunk(
    'users/add',
    async (user) => await addUser(user),
);

export const edit = createAsyncThunk(
    'users/edit',
    async (user) => await editUser(user),
);

export const del = createAsyncThunk(
    'users/delete',
    async (id) => await deleteUser(id),
);

export const wipe = createAsyncThunk('users/reset', async () => await reset());

const usersSlice = createSlice({
    name: 'users',
    initialState: [],
    reducers: {
        setUsers: (_, action) => action.payload,
        sort: (state, action) => {
            const { by, ascending } = action.payload;
            state.sort((prev, next) =>
                ascending
                    ? prev[by] > next[by]
                        ? 1
                        : -1
                    : prev[by] < next[by]
                      ? 1
                      : -1,
            );
        },
    },
});

export const { sort, setUsers } = usersSlice.actions;

export default usersSlice.reducer;
