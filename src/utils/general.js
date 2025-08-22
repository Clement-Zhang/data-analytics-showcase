export function userObj(data) {
    return {
        fname: data.fname,
        lname: data.lname,
        gender: data.gender,
        country: data.country,
        dob: new Date(data['dob']).toISOString(),
    };
}
