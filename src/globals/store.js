import { addListener, removeListener } from '../services/socket.service';
import { getData } from '../services/showcase.service';
import usersReducer from './users';
import { setUsers } from './users';
import analyticsReducer from './analytics';
import { setAnalytics } from './analytics';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { useEffect } from 'react';

const store = configureStore({
    reducer: {
        users: usersReducer,
        analytics: analyticsReducer,
    },
});
const load = (data) => {
    store.dispatch(setUsers(data.users));
    store.dispatch(setAnalytics(data.analytics));
    console.log('Data loaded');
};

const data = await getData();
load(data);

export default function DataProvider({ children }) {
    useEffect(() => {
        addListener('update', load);
        return () => {
            removeListener('update', load);
        };
    }, []);
    return <Provider store={store}>{children}</Provider>;
}
