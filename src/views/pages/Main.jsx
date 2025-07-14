import Input from '../components/customs/Input';
import DateInput from '../components/customs/DateInput';
import Button from '../components/customs/Button';
import { getUsers, addUser, reset, getSummary } from '../../services/showcase';
import { use, useEffect, useState } from 'react';
import { BarChart, XAxis, YAxis, Bar, Legend, Tooltip, Cell } from 'recharts';
import '../../assets/css/Main.css';

export default function Main() {
    const [users, setUsers] = useState([]);
    const [analytics, setAnalytics] = useState({});
    const [genderChart, setGenderChart] = useState([]);
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [gender, setGender] = useState('male');
    const [dob, setDob] = useState('');
    const [isoString, setIsoString] = useState('');
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
    }, [analytics]);
    useEffect(() => {
        async function loadAnalytics() {
            setAnalytics(await getSummary());
        }
        loadAnalytics();
        console.log(analytics);
    }, [users]);
    useEffect(() => {
        async function load() {
            setUsers(await getUsers());
        }
        load();
    }, []);
    useEffect(() => {
        if (dob) {
            setIsoString(new Date(dob).toISOString());
        }
    }, [dob]);
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
            <BarChart width={500} height={300} data={genderChart}>
                <XAxis dataKey="name" />
                <YAxis />
                <Legend />
                <Tooltip />
                <Bar dataKey="value">
                    {genderChart.map((entry, index) => (
                        <Cell key={'cell-' + index} fill={entry.fill} />
                    ))}
                </Bar>
            </BarChart>
            <table>
                <thead className="bg-blue-500">
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Gender</th>
                        <th>DOB</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name.first}</td>
                            <td>{user.name.last}</td>
                            <td>{user.gender}</td>
                            <td>{user.dob}</td>
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
                            console.log(e.target.value);
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
                        await addUser({
                            name: { first: fname, last: lname },
                            gender: gender,
                            dob: isoString,
                        });
                        setUsers(await getUsers());
                    }}
                >
                    Add User
                </Button>
            </form>
        </>
    );
}
