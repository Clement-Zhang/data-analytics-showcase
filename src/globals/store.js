import usersReducer from './users';
import { setUsers } from './users';
import analyticsReducer from './analytics';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

const store = configureStore({
    reducer: {
        users: usersReducer,
        analytics: analyticsReducer,
    },
});

await store.dispatch(setUsers());
console.log(store.getState());

export default function DataProvider({ children }) {
    return <Provider store={store}>{children}</Provider>;
}
