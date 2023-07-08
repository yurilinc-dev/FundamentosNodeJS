const crypto = require('crypto');
const path = require('path');

const databasePath = path.join(__dirname, 'database.json');

const routes = [
{
method: 'GET',
path: '/users',
handler: (req, res) => {
    const users = database.select('users');
    res.end(JSON.stringify(users));
}
},
{
method: 'POST',
path: '/users',
handler: (req, res) => {
    const { name, email } = req.body;

    const user = {
    id: crypto.randomUUID(),
    name,
    email
    };
    database.insert('users', user);

    res.writeHead(201).end();
}
}
];

module.exports = { routes };
