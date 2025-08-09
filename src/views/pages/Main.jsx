import Input from '../components/customs/Input';
import DateInput from '../components/customs/DateInput';
import Button from '../components/customs/Button';
import Header from '../components/customs/Header';
import { getUsers, addUser, reset, getSummary } from '../../services/showcase';
import { date } from '../../utils/date.utils';
import { useEffect, useState } from 'react';
import Graph from '../components/customs/Graph';
import '../../assets/css/Main.css';

export default function Main() {
    const [users, setUsers] = useState([]);
    const [analytics, setAnalytics] = useState({});
    const [genderChart, setGenderChart] = useState([]);
    const [ageGraph, setAgeGraph] = useState([]);
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [gender, setGender] = useState('male');
    const [dob, setDob] = useState('');
    const [sortBy, setSortBy] = useState('fname');
    const [sortAscending, setSortAscending] = useState(true);
    const [error, setError] = useState('');
    useEffect(() => {
        setGenderChart([
            {
                name: 'Male',
                value: analytics.male,
                fill: '#3b82f6',
            },
            {
                name: 'Female',
                value: analytics.female,
                fill: '#ef4444',
            },
        ]);
        setAgeGraph([
            { name: '0-14', value: analytics[0] },
            { name: '15-24', value: analytics[15] },
            { name: '25-54', value: analytics[25] },
            { name: '55-64', value: analytics[55] },
            { name: '65+', value: analytics[65] },
        ]);
    }, [analytics]);
    useEffect(() => {
        async function loadAnalytics() {
            setAnalytics(await getSummary());
        }
        loadAnalytics();
    }, [users]);
    useEffect(() => {
        async function load() {
            setUsers(await getUsers());
        }
        load();
    }, []);
    useEffect(() => {
        users.sort((prev, next) => {
            if (sortBy === 'fname') {
                return (sortAscending && prev.name.first < next.name.first) ||
                    (!sortAscending && prev.name.first > next.name.first)
                    ? -1
                    : 1;
            } else if (sortBy === 'lname') {
                return (sortAscending && prev.name.last < next.name.last) ||
                    (!sortAscending && prev.name.last > next.name.last)
                    ? -1
                    : 1;
            } else {
                return (sortAscending && prev[sortBy] < next[sortBy]) ||
                    (!sortAscending && prev[sortBy] > next[sortBy])
                    ? -1
                    : 1;
            }
        });
    }, [sortBy, sortAscending]);
    return (
        <>
            <Button
                onClick={async () => {
                    await reset();
                    setUsers([]);
                }}
                position="fixed top-0 right-0"
            >
                reset
            </Button>
            <Graph data={genderChart} defaultColour={false} />
            <Graph data={ageGraph} />
            <table>
                <thead className="bg-blue-500">
                    <tr>
                        <th>ID</th>
                        <Header
                            title="First Name"
                            width="32"
                            onSort={() => {
                                setSortBy('fname');
                                setSortAscending((prev) => !prev);
                            }}
                        />
                        <Header
                            title="Last Name"
                            width="32"
                            onSort={() => {
                                setSortBy('lname');
                                setSortAscending((prev) => !prev);
                            }}
                        />
                        <Header
                            title="Gender"
                            width="32"
                            onSort={() => {
                                setSortBy('gender');
                                setSortAscending((prev) => !prev);
                            }}
                        />
                        <Header
                            title="DOB"
                            width="32"
                            onSort={() => {
                                setSortBy('dob');
                                setSortAscending((prev) => !prev);
                            }}
                        />
                        <Header
                            title="Age"
                            width="32"
                            onSort={() => {
                                setSortBy('age');
                                setSortAscending((prev) => !prev);
                            }}
                        />
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name.first}</td>
                            <td>{user.name.last}</td>
                            <td>{user.gender}</td>
                            <td>{date(user.dob)}</td>
                            <td>{user.age}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <form>
                <Input value={fname} onChange={setFname}>
                    First Name
                </Input>
                <Input value={lname} onChange={setLname}>
                    Last Name
                </Input>
                <label>
                    Gender:
                    <select
                        className="border border-gray-300"
                        value={gender}
                        onChange={(e) => {
                            setGender(e.target.value);
                        }}
                    >
                        <option value="male">male</option>
                        <option value="female">female</option>
                    </select>
                </label>
                <DateInput value={dob} onChange={setDob} type="date">
                    Date of Birth
                </DateInput>
                <Button
                    type="submit"
                    onClick={async (e) => {
                        e.preventDefault();
                        if (fname === '' || lname === '') {
                            setError('Type in a first and/or last name');
                            return;
                        } else if (dob === '') {
                            setError('Choose a date of birth');
                            return;
                        }
                        setError('');
                        await addUser({
                            name: { first: fname, last: lname },
                            gender: gender,
                            dob: new Date(dob).toISOString(),
                        });
                        setUsers(await getUsers());
                        setFname('');
                        setLname('');
                        setDob('');
                        setGender('male');
                    }}
                >
                    Add User
                </Button>
            </form>
            <p className={'text-red-500 ' + (error ? '' : 'hidden')}>{error}</p>
        </>
    );
}
