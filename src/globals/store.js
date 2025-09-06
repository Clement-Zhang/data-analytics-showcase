import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import usersReducer from './users';
import { sort, setUsers } from './users';
import organizeReducer from './organize';
import { setSorted } from './organize';
import analyticsReducer from './analytics';
import { setAnalytics } from './analytics';

const store = configureStore({
    reducer: {
        users: usersReducer,
        organize: organizeReducer,
        analytics: analyticsReducer,
    },
});

store.subscribe(() => {
    console.log("in")
    if (store.getState().organize.changed) {
        store.dispatch(sort(store.getState().organize.sort));
        store.dispatch(setSorted());
    } else if (store.getState().users.changed) {
        store.dispatch(sort(store.getState().organize.sort));
        store.dispatch(setAnalytics());
    }
    if (store.getState().users.update) {
        store.dispatch(setUsers());
    }
});

export default function DataProvider({ children }) {
    store.dispatch(setUsers());
    return <Provider store={store}>{children}</Provider>;
}
