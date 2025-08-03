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

async function addUser(user) {
    await fetch(process.env.REACT_APP_BACKEND + '/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
    });
}

async function reset() {
    await fetch(process.env.REACT_APP_BACKEND + '/wipe', {
        method: 'POST',
    });
}

export { getUsers, addUser, reset, getSummary };
