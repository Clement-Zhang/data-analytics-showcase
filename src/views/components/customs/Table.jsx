import Header from './Header';
import Form from './Form';
import Image from './Image';
import editIcon from '../../../assets/icons/edit.png';
import remove from '../../../assets/icons/remove.png';
import { editData } from '../../../configs/form/data';
import { editError } from '../../../configs/form/error';
import { useData } from '../../../contexts/data';
import { useModal } from '../../../contexts/modal';
import { date } from '../../../utils/date';
import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';
countries.registerLocale(enLocale);

export default function Table({ description }) {
    const { users, edit, del, setSortBy, setSortAscending } = useData();
    const { openModal, closeModal } = useModal();
    return (
        <table className="w-full table-fixed border border-gray-200">
            <thead className="bg-blue-500 text-white">
                <tr>
                    {description.map((column) => {
                        if (column.sortable) {
                            column.onSort = () => {
                                setSortBy(column.key);
                                setSortAscending((prev) => !prev);
                            };
                        }
                        return <Header {...column} />;
                    })}
                    <Header visible={false} width="w-18" />
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <tr
                        key={user.id}
                        className="group border-t border-gray-200"
                    >
                        {description.map((column) => {
                            switch (column.key) {
                                case 'country':
                                    return (
                                        <td className="px-4 py-2">
                                            {user.country}
                                        </td>
                                    );
                                case 'dob':
                                    return (
                                        <td className="px-4 py-2">
                                            {date(user.dob)}
                                        </td>
                                    );
                                default:
                                    return (
                                        <td className="px-4 py-2">
                                            {user[column.key]}
                                        </td>
                                    );
                            }
                        })}
                        <td className="border-white bg-white relative align-middle">
                            <div className="opacity-0 group-hover:opacity-100">
                                <Image
                                    src={editIcon}
                                    alt="Edit User"
                                    interactions="absolute right-1 -translate-y-1/2"
                                    onClick={() =>
                                        openModal(
                                            <Form
                                                dataConfig={editData(user)}
                                                errorConfig={editError}
                                                submit={async (data) => {
                                                    await edit({
                                                        id: user.id,
                                                        fname: data['fname'],
                                                        lname: data['lname'],
                                                        gender: data['gender'],
                                                        country:
                                                            data['country'],
                                                        dob: new Date(
                                                            data['dob']
                                                        ).toISOString(),
                                                    });
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
    );
}
