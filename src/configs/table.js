import { date } from '../utils/date';

export const controlPanel = [
    { header: { name: 'ID', key: 'id', width: 'w-64', tags: ['visible'] } },
    {
        header: {
            name: 'First Name',
            key: 'fname',
            tags: ['sortable', 'visible'],
        },
    },
    {
        header: {
            name: 'Last Name',
            key: 'lname',
            tags: ['sortable', 'visible'],
        },
    },
    {
        header: {
            name: 'Gender',
            key: 'gender',
            tags: ['sortable', 'visible'],
        },
    },
    {
        header: {
            name: 'Country',
            key: 'country',
            tags: ['sortable', 'visible'],
        },
    },
    {
        header: { name: 'DOB', key: 'dob', tags: ['sortable', 'visible'] },
        tags: ['special processing'],
        process: (dob) => date(dob),
    },
    { header: { name: 'Age', key: 'age', tags: ['sortable', 'visible'] } },
];
