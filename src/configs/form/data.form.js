import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';
countries.registerLocale(enLocale);

/*
    structure: ordered list of input objects
    each input object contains a "name" field to specify the key to access the data
    for inputs that are capable of having a placeholder, a "placeholder" field specifies a placeholder in lieu of a label
    for select inputs, an "options" field specifies the list of options
    for inputs that can't have a placeholder, an explicit "label" field gives it an html label tag
    for inputs whose field composition does not indicate type, an explicit "type" field specifies the type
    for all inputs, a "default" field specifies the default value if one is needed
*/

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
