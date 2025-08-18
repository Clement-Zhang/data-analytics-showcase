import { createContext, useContext, useState, useEffect } from 'react';
import {
    addUser,
    getUsers,
    getSummary,
    editUser,
    deleteUser,
    reset,
} from '../services/showcase';

const DataContext = createContext();

export const useData = () => {
    return useContext(DataContext);
};

export const DataProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [analytics, setAnalytics] = useState({});
    const [sortBy, setSortBy] = useState('fname');
    const [sortAscending, setSortAscending] = useState(true);
    async function refresh() {
        setUsers(await getUsers());
        setAnalytics(await getSummary());
    }
    async function add(user) {
        await addUser(user);
        await refresh();
    }
    async function edit(user) {
        await editUser(user);
        await refresh();
    }
    async function del(id) {
        await deleteUser(id);
        await refresh();
    }
    async function wipe() {
        await reset();
        await refresh();
    }
    useEffect(() => {
        (async () => {
            refresh();
        })();
    }, []);
    useEffect(() => {
        users.sort((prev, next) => {
            switch (sortBy) {
                case 'fname':
                    return (sortAscending &&
                        prev.name.first < next.name.first) ||
                        (!sortAscending && prev.name.first > next.name.first)
                        ? -1
                        : 1;
                case 'lname':
                    return (sortAscending && prev.name.last < next.name.last) ||
                        (!sortAscending && prev.name.last > next.name.last)
                        ? -1
                        : 1;
                default:
                    return (sortAscending && prev[sortBy] < next[sortBy]) ||
                        (!sortAscending && prev[sortBy] > next[sortBy])
                        ? -1
                        : 1;
            }
        });
    }, [sortBy, sortAscending]);
    return (
        <DataContext.Provider
            value={{
                users,
                analytics,
                add,
                edit,
                del,
                wipe,
                setSortBy,
                setSortAscending,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};
