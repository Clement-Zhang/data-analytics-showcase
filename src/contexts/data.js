import { createContext, useContext, useState, useEffect } from 'react';
import { getUsers, addUser, reset, getSummary } from '../services/showcase';

const DataContext = createContext();

export const useData = () => {
    return useContext(DataContext);
};

export const DataProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [analytics, setAnalytics] = useState({});
    async function add(user) {
        await addUser(user);
        await refresh();
    }
    async function refresh() {
        setUsers(await getUsers());
        setAnalytics(await getSummary());
    }
    async function deleteAll() {
        await reset();
        await refresh();
    }
    useEffect(() => {
        (async () => {
            refresh();
        })();
    }, []);
    return (
        <DataContext.Provider value={{ users, analytics, add, deleteAll }}>
            {children}
        </DataContext.Provider>
    );
};
