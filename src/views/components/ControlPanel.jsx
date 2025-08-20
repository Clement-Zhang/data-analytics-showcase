import Header from './customs/Header';
import Card from './Card';
import Button from './customs/Button';
import Form from './customs/Form';
import Image from './customs/Image';
import editIcon from '../../assets/icons/edit.png';
import remove from '../../assets/icons/remove.png';
import { addData } from '../../configs/form/data';
import { addError, editError } from '../../configs/form/error';
import { useData } from '../../contexts/data';
import { useModal } from '../../contexts/modal';
import { date } from '../../utils/date';
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
                                dataConfig={addData}
                                errorConfig={addError}
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
            <table className="w-full table-auto border border-gray-200">
                <thead className="bg-blue-500 text-white">
                    <tr>
                        <Header title="ID" sortable={false} />
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
                                                    errorConfig={editError}
                                                    submit={async (data) => {
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
