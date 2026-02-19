/*
    structure: each config is a list of column objects
    each column's "name" is what will be displayed
    by default, the key to access the data is the lowercase version of the name
    if the key needs to be different than the name, use the "key" field to specify
    by default, the fill color of each bar is '#b5b4b1' (Gray)
    if a different color is desired, use the "fill" field to specify
*/

export const gender = [
    { name: 'Male', fill: '#3b82f6' },
    { name: 'Female', fill: '#ef4444' },
];
export const age = [
    { name: '0-14', key: '0' },
    { name: '15-24', key: '15' },
    { name: '25-54', key: '25' },
    { name: '55-64', key: '55' },
    { name: '65+', key: '65' },
];
