const route = (url) => process.env.REACT_APP_BACKEND + url;

export async function addUser(user) {
    await fetch(route('/add'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
    });
}

export async function getData() {
    const res = await fetch(route('/data'), {
        method: 'GET',
    });
    return await res.json();
}

export async function editUser(user) {
    await fetch(route('/edit'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
    });
}

export async function deleteUser(id) {
    await fetch(route('/delete'), {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: id,
    });
}

export async function reset() {
    await fetch(route('/wipe'), {
        method: 'POST',
    });
}
