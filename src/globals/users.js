import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
    addUser,
    getUsers,
    editUser,
    deleteUser,
    reset,
} from '../services/showcase';

export const setUsers = createAsyncThunk('users/set', async (_, thunkAPI) => {
    const { dispatch } = thunkAPI;
    dispatch(setFlag({ flag: 'update', value: false }));
    return await getUsers();
});

export function selectUsers(state) {
    return state.users.users;
}

export const add = createAsyncThunk('users/add', async (user, thunkAPI) => {
    const { dispatch } = thunkAPI;
    await addUser(user);
    dispatch(setFlag({ flag: 'update', value: true }));
});

export const edit = createAsyncThunk('users/edit', async (user, thunkAPI) => {
    const { dispatch } = thunkAPI;
    await editUser(user);
    dispatch(setFlag({ flag: 'update', value: true }));
});

export const sort = createAsyncThunk('users/sort', async (_, thunkAPI) => {
    const { getState } = thunkAPI;
    const { sortBy, sortAscending } = getState().organize;
    return getState().users.users.toSorted((prev, next) =>
        (sortAscending && prev[sortBy] < next[sortBy]) ||
        (!sortAscending && prev[sortBy] > next[sortBy])
            ? -1
            : 1
    );
});

export const del = createAsyncThunk('users/delete', async (id, thunkAPI) => {
    const { dispatch } = thunkAPI;
    await deleteUser(id);
    dispatch(setFlag({ flag: 'update', value: true }));
});

export const wipe = createAsyncThunk('users/reset', async (_, thunkAPI) => {
    const { dispatch } = thunkAPI;
    await reset();
    dispatch(setFlag({ flag: 'update', value: true }));
});

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        changed: false,
        update: false,
    },
    reducers: {
        setFlag: (state, action) => {
            state[action.payload.flag] = action.payload.value;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(setUsers.fulfilled, (state, action) => {
                state.users = action.payload;
                state.changed = true;
            })
            .addCase(sort.fulfilled, (state, action) => {
                state.users = action.payload;
                state.changed = false;
            });
    },
});

export const { setFlag } = usersSlice.actions;

export default usersSlice.reducer;

// import { createContext, useContext, useState, useEffect } from 'react';
// import {
//     addUser,
//     getUsers,
//     getSummary,
//     editUser,
//     deleteUser,
//     reset,
// } from '../services/showcase';

// const DataContext = createContext();

// export const useData = () => {
//     return useContext(DataContext);
// };

// export const DataProvider = ({ children }) => {
//     const [users, setUsers] = useState([]);
//     const [analytics, setAnalytics] = useState({});
//     const [sortBy, setSortBy] = useState('fname');
//     const [sortAscending, setSortAscending] = useState(true);
//     async function refresh() {
//         setUsers(await getUsers());
//         setAnalytics(await getSummary());
//     }
//     async function add(user) {
//         await addUser(user);
//         await refresh();
//     }
//     async function edit(user) {
//         await editUser(user);
//         await refresh();
//     }
//     async function del(id) {
//         await deleteUser(id);
//         await refresh();
//     }
//     async function wipe() {
//         await reset();
//         await refresh();
//     }
//     useEffect(() => {
//         (async () => {
//             refresh();
//         })();
//     }, []);
//     useEffect(() => {
//         users.sort((prev, next) =>
//             (sortAscending && prev[sortBy] < next[sortBy]) ||
//             (!sortAscending && prev[sortBy] > next[sortBy])
//                 ? -1
//                 : 1
//         );
//     }, [sortBy, sortAscending]);
//     return (
//         <DataContext.Provider
//             value={{
//                 users,
//                 analytics,
//                 add,
//                 edit,
//                 del,
//                 wipe,
//                 setSortBy,
//                 setSortAscending,
//             }}
//         >
//             {children}
//         </DataContext.Provider>
//     );
// };
