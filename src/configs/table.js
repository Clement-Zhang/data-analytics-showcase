import { date } from '../utils/date';
/*
    structure: ordered list of header objects
    each header object contains a "header" field for the Header component
    usage of "header" field is shown in Header component
    optional fields:
    - tags: list describing extra steps that should be taken before the data is displayed
            this list is necessary because a blanket assumption of extra steps will bug
*/
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
