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
        placeholder: 'Date of Birth',
    },
];