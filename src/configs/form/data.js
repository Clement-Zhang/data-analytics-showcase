import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';
countries.registerLocale(enLocale);

export const addData = [
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
        options: Object.values(countries.getNames('en')),
    },
    {
        name: 'dob',
        type: 'date',
        label: 'Date of Birth:',
    },
];

export function editData(user) {
    return Array.from(addData, (item) => {
        return {
            ...item,
            default: user[item.name],
        };
    });
}
