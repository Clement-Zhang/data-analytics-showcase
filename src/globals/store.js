import { receive } from '../services/socket.service';
import { getData } from '../services/showcase.service';
import usersReducer from './users';
import { setUsers } from './users';
import analyticsReducer from './analytics';
import { setAnalytics } from './analytics';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

const store = configureStore({
    reducer: {
        users: usersReducer,
        analytics: analyticsReducer,
    },
});

const data=await getData();
// store.dispatch(setUsers(data.users));
// store.dispatch(setAnalytics(data.analytics));

export default function DataProvider({ children }) {
    return <Provider store={store}>{children}</Provider>;
}
