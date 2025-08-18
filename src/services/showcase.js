async function addUser(user) {
    await fetch(process.env.REACT_APP_BACKEND + '/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
    });
}

async function getUsers() {
    const res = await fetch(process.env.REACT_APP_BACKEND + '/get', {
        method: 'GET',
    });
    return await res.json();
}

async function getSummary() {
    const res = await fetch(process.env.REACT_APP_BACKEND + '/summarize', {
        method: 'GET',
    });
    return await res.json();
}

async function editUser(user) {
    await fetch(process.env.REACT_APP_BACKEND + '/edit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
    });
}

async function deleteUser(id) {
    await fetch(process.env.REACT_APP_BACKEND + '/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: id,
    });
}

async function reset() {
    await fetch(process.env.REACT_APP_BACKEND + '/wipe', {
        method: 'POST',
    });
}

export { addUser, getUsers, getSummary, editUser, deleteUser, reset };
