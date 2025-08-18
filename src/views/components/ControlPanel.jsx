import Header from './customs/Header';
import Card from './Card';
import Button from './customs/Button';
import Form from './customs/Form';
import Image from './customs/Image';
import editIcon from '../../assets/icons/edit.png';
import remove from '../../assets/icons/remove.png';
import { useData } from '../../contexts/data';
import { useModal } from '../../contexts/modal';
import { date, inFuture } from '../../utils/date';
import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';
countries.registerLocale(enLocale);

export default function ControlPanel() {
    const { users, add, edit, del, wipe, setSortAscending, setSortBy } =
        useData();
    const { openModal, closeModal } = useModal();
    return (
        <Card title="User Details" styling="overflow-auto">
            <div className="absolute top-0 right-0">
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
                                        options: ['Male', 'Female'],
                                    },
                                    {
                                        name: 'country',
                                        placeholder: 'Country',
                                        options: Object.values(
                                            countries.getNames('en')
                                        ),
                                    },
                                    {
                                        name: 'dob',
                                        type: 'date',
                                        placeholder: 'Date of Birth',
                                    },
                                ]}
                                errorConfig={[
                                    {
                                        condition: (data) =>
                                            !data['fname'] || !data['lname'],
                                        message:
                                            'Type in a first and/or last name',
                                    },
                                    {
                                        condition: (data) => !data['gender'],
                                        message: 'Choose a gender',
                                    },
                                    {
                                        condition: (data) => !data['country'],
                                        message: 'Choose a country',
                                    },
                                    {
                                        condition: (data) => !data['dob'],
                                        message: 'Choose a date of birth',
                                    },
                                    {
                                        condition: (data) =>
                                            inFuture(data['dob']),
                                        message:
                                            'Date of birth cannot be in the future',
                                    },
                                ]}
                                submit={async (data) => {
                                    await add({
                                        name: {
                                            first: data['fname'],
                                            last: data['lname'],
                                        },
                                        gender: data['gender'],
                                        country: data['country'],
                                        dob: new Date(
                                            data['dob']
                                        ).toISOString(),
                                    });
                                    closeModal();
                                }}
                            />
                        )
                    }
                    width="20"
                >
                    Add User
                </Button>
                <Button onClick={wipe}>Reset</Button>
            </div>
            <table className="min-w-full table-auto border border-gray-200">
                <thead className="bg-blue-500 text-white">
                    <tr>
                        <th className="px-4 py-2 text-left">ID</th>
                        <Header
                            title="First Name"
                            onSort={() => {
                                setSortBy('fname');
                                setSortAscending((prev) => !prev);
                            }}
                        />
                        <Header
                            title="Last Name"
                            onSort={() => {
                                setSortBy('lname');
                                setSortAscending((prev) => !prev);
                            }}
                        />
                        <Header
                            title="Gender"
                            onSort={() => {
                                setSortBy('gender');
                                setSortAscending((prev) => !prev);
                            }}
                        />
                        <Header
                            title="Country"
                            onSort={() => {
                                setSortBy('country');
                                setSortAscending((prev) => !prev);
                            }}
                        />
                        <Header
                            title="DOB"
                            onSort={() => {
                                setSortBy('dob');
                                setSortAscending((prev) => !prev);
                            }}
                        />
                        <Header
                            title="Age"
                            onSort={() => {
                                setSortBy('age');
                                setSortAscending((prev) => !prev);
                            }}
                        />
                        <th className="w-12 border-white bg-white" />
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr
                            key={user.id}
                            className="group border-t border-gray-200"
                        >
                            <td className="px-4 py-2">{user.id}</td>
                            <td className="px-4 py-2">{user.name.first}</td>
                            <td className="px-4 py-2">{user.name.last}</td>
                            <td className="px-4 py-2">{user.gender}</td>
                            <td className="px-4 py-2">{user.country}</td>
                            <td className="px-4 py-2">{date(user.dob)}</td>
                            <td className="px-4 py-2">{user.age}</td>
                            <td className="border-white bg-white relative align-middle">
                                <div className="opacity-0 group-hover:opacity-100">
                                    <Image
                                        src={editIcon}
                                        alt="Edit User"
                                        interactions="absolute right-1 -translate-y-1/2"
                                        onClick={() =>
                                            openModal(
                                                <Form
                                                    dataConfig={[
                                                        {
                                                            name: 'fname',
                                                            placeholder:
                                                                'First Name',
                                                            default:
                                                                user.name.first,
                                                        },
                                                        {
                                                            name: 'lname',
                                                            placeholder:
                                                                'Last Name',
                                                            default:
                                                                user.name.last,
                                                        },
                                                        {
                                                            name: 'gender',
                                                            placeholder:
                                                                'Gender',
                                                            default:
                                                                user.gender,
                                                            options: [
                                                                'Male',
                                                                'Female',
                                                            ],
                                                        },
                                                        {
                                                            name: 'country',
                                                            placeholder:
                                                                'Country',
                                                            default:
                                                                user.country,
                                                            options:
                                                                Object.values(
                                                                    countries.getNames(
                                                                        'en'
                                                                    )
                                                                ),
                                                        },
                                                        {
                                                            name: 'dob',
                                                            type: 'date',
                                                            placeholder:
                                                                'Date of Birth',
                                                            default: user.dob,
                                                        },
                                                    ]}
                                                    errorConfig={[
                                                        {
                                                            condition: (data) =>
                                                                !data[
                                                                    'fname'
                                                                ] ||
                                                                !data['lname'],
                                                            message:
                                                                'First and last names cannot be empty',
                                                        },
                                                        {
                                                            condition: (data) =>
                                                                inFuture(
                                                                    data['dob']
                                                                ),
                                                            message:
                                                                'Date of birth cannot be in the future',
                                                        },
                                                    ]}
                                                    submit={async (data) => {
                                                        console.log(data);
                                                        await edit({
                                                            id: user.id,
                                                            name: {
                                                                first: data[
                                                                    'fname'
                                                                ],
                                                                last: data[
                                                                    'lname'
                                                                ],
                                                            },
                                                            gender: data[
                                                                'gender'
                                                            ],
                                                            country:
                                                                data['country'],
                                                            dob: new Date(
                                                                data['dob']
                                                            ).toISOString(),
                                                        });
                                                        closeModal();
                                                    }}
                                                />
                                            )
                                        }
                                    />
                                    <Image
                                        src={remove}
                                        alt="Remove User"
                                        interactions="absolute right-6 -translate-y-1/2"
                                        onClick={async () => {
                                            await del(user.id);
                                            closeModal();
                                        }}
                                    />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Card>
    );
}
