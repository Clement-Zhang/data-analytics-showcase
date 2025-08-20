import { inFuture } from '../../utils/date';
import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';
countries.registerLocale(enLocale);

export const addError = [
    {
        condition: (data) => !data['fname'] || !data['lname'],
        message: 'Type in a first and/or last name',
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
        condition: (data) => inFuture(data['dob']),
        message: 'Date of birth cannot be in the future',
    },
];

export const editError = [
    {
        condition: (data) => !data['fname'] || !data['lname'],
        message: 'First and last names cannot be empty',
    },
    {
        condition: (data) => inFuture(data['dob']),
        message: 'Date of birth cannot be in the future',
    },
];
