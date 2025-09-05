import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import usersReducer from './users';
import { sort } from './users';
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
    if (store.getState().organize.changed) {
        store.dispatch(sort());
        store.dispatch(setSorted());
    } else if (store.getState().users.changed) {
        store.dispatch(sort());
        store.dispatch(setAnalytics());
    }
});

export default function Data({ children }) {
    return <Provider store={store}>{children}</Provider>;
}
