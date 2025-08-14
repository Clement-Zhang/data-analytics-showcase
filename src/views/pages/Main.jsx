import Header from '../components/customs/Header';
import Graph from '../components/customs/Graph';
import Form from '../components/customs/Form';
import Button from '../components/customs/Button';
import { useModal } from '../../contexts/modal';
import { useData } from '../../contexts/data';
import { date } from '../../utils/date';
import { useEffect, useState } from 'react';
import '../../assets/css/Main.css';

export default function Main() {
    const { users, add, deleteAll } = useData();
    const [sortBy, setSortBy] = useState('fname');
    const [sortAscending, setSortAscending] = useState(true);
    const { openModal, closeModal } = useModal();
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
            <div className="p-6 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Graph
                        title="Gender Distribution"
                        bars={[
                            { name: 'male', fill: '#3b82f6' },
                            { name: 'female', fill: '#ef4444' },
                        ]}
                    />
                    <Graph
                        title="Age Groups"
                        bars={[
                            { name: '0-14', field: '0' },
                            { name: '15-24', field: '15' },
                            { name: '25-54', field: '25' },
                            { name: '55-64', field: '55' },
                            { name: '65+', field: '65' },
                        ]}
                    />
                </div>
                <div className="bg-white rounded-lg shadow-md p-4 overflow-auto">
                    <div className="flex justify-between">
                        <h2 className="text-lg font-semibold mb-4">
                            User Details
                        </h2>
                        <div className="flex">
                            <Button
                                onClick={() =>
                                    openModal(
                                        <Form
                                            dataConfig={[
                                                {
                                                    name: 'fname',
                                                    placeholder: 'First Name',
                                                },
                                                {
                                                    name: 'lname',
                                                    placeholder: 'Last Name',
                                                },
                                                {
                                                    name: 'gender',
                                                    placeholder: 'Gender',
                                                    options: ['male', 'female'],
                                                },
                                                {
                                                    name: 'dob',
                                                    type: 'date',
                                                    placeholder:
                                                        'Date of Birth',
                                                },
                                            ]}
                                            errorConfig={[
                                                {
                                                    condition: (data) =>
                                                        !data['fname'] ||
                                                        !data['lname'],
                                                    message:
                                                        'Type in a first and/or last name',
                                                },
                                                {
                                                    condition: (data) =>
                                                        !data['gender'],
                                                    message: 'Choose a gender',
                                                },
                                                {
                                                    condition: (data) =>
                                                        !data['dob'],
                                                    message:
                                                        'Choose a date of birth',
                                                },
                                            ]}
                                            submit={async (data) => {
                                                await add({
                                                    name: {
                                                        first: data['fname'],
                                                        last: data['lname'],
                                                    },
                                                    gender: data['gender'],
                                                    dob: data['dob'],
                                                });
                                                closeModal();
                                            }}
                                        />
                                    )
                                }
                                width="20"
                            >
                                add user
                            </Button>
                            <Button onClick={deleteAll}>reset</Button>
                        </div>
                    </div>
                    <table className="min-w-full table-auto border border-gray-200">
                        <thead className="bg-blue-500 text-white">
                            <tr>
                                <th className="px-4 py-2 text-left">ID</th>
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
                                <tr
                                    key={user.id}
                                    className="border-t border-gray-200"
                                >
                                    <td className="px-4 py-2">{user.id}</td>
                                    <td className="px-4 py-2">
                                        {user.name.first}
                                    </td>
                                    <td className="px-4 py-2">
                                        {user.name.last}
                                    </td>
                                    <td className="px-4 py-2 capitalize">
                                        {user.gender}
                                    </td>
                                    <td className="px-4 py-2">
                                        {date(user.dob)}
                                    </td>
                                    <td className="px-4 py-2">{user.age}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
