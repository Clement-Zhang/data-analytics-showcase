import Header from './Header';
import Form from './Form';
import Image from './Image';
import editIcon from '../../../assets/icons/edit.png';
import remove from '../../../assets/icons/remove.png';
import { userObj } from '../../../utils/general';
import { editData } from '../../../configs/form/data';
import { editError } from '../../../configs/form/error';
import { useData } from '../../../contexts/data';
import { useModal } from '../../../contexts/modal';
import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';
import { date } from '../../../utils/date';
countries.registerLocale(enLocale);

export default function Table({ description }) {
    const { users, edit, del, setSortBy, setSortAscending } = useData();
    const { openModal, closeModal } = useModal();
    return (
        <table className="w-full table-fixed border border-gray-200">
            <thead className="bg-blue-500 text-white">
                <tr>
                    {description.map((column) => {
                        if (column.header.tags?.includes('sortable')) {
                            column.header.onSort = () => {
                                setSortBy(column.header.key);
                                setSortAscending((prev) => !prev);
                            };
                        }
                        return <Header {...column.header} />;
                    })}
                    <Header width="w-18" />
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <tr
                        key={user.id}
                        className="group border-t border-gray-200"
                    >
                        {description.map((column) => {
                            return (
                                <td className="px-4 py-2">
                                    {column.tags?.includes('special processing')
                                        ? column.process(
                                              user[column.header.key]
                                          )
                                        : user[column.header.key]}
                                </td>
                            );
                        })}
                        <td className="border-white bg-white relative align-middle">
                            <div className="opacity-0 group-hover:opacity-100">
                                <Image
                                    src={editIcon}
                                    alt="Edit User"
                                    interactions="absolute right-1 -translate-y-1/2"
                                    onClick={() => {
                                        openModal(
                                            <Form
                                                dataConfig={editData({
                                                    ...user,
                                                    ...{
                                                        dob: date(
                                                            user.dob,
                                                            'YYYY-MM-DD'
                                                        ),
                                                    },
                                                })}
                                                errorConfig={editError}
                                                submit={async (data) => {
                                                    await edit({
                                                        id: user.id,
                                                        ...userObj(data),
                                                    });
                                                }}
                                            />
                                        );
                                    }}
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
