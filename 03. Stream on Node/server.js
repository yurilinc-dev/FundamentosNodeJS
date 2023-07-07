// Criar usuários
// Listar usuários
// Editar usuários
// Remover usuários

/* GET, POST, PUT, DELETE, PATCH
GET = Buscar uma informação do back-end
POST = Ao criar uma informação no back-end
PUT = Editar ou atualizar um recurso no back-end
PATCH = Atualizar uma informação unica ou especifica de um recurso no back-end
DELETE = Como ja diz no back-end

GET /users => buscando usuários no back-end
POST /users => criar um usuário no back-end

Stateful - Stateless

Cabeçalhos (requisição, resposta) => metadados
*/

/*
const http = require('http');
const users = []
const server = http.createServer(async (req, res) => {
    const { method, url } = req

    const buffers = []

    for await (const chunk of req) {
        buffers.push(chunk)
    }

    try {
       req.body = JSON.parse(Buffer.concat(buffers).toString());
    } catch (e){
        req.body = null
    }
    



    //early return
    if (method === 'GET' && url === '/users') {
        return res
            .setHeader('Content-Type', 'application/json')
            .end(JSON.stringify(users))
    }
    if (method === 'POST' && url === '/users') {
        const { name, email } = req.body

        users.push({
            id: 1,
            name,
            email,
        })

        return res.writeHead(201).end()
    }

    return res.writeHead(404).end()
})

server.listen(3333);*/

const http = require('http');

const users = [];

const server = http.createServer(async (req, res) => {
    const { method, url } = req;

    const buffers = [];

    for await (const chunk of req) {
        buffers.push(chunk);
    }

    try {
        req.body = JSON.parse(Buffer.concat(buffers).toString());
    } catch (e) {
        req.body = null;
    }

    // Early return
    if (method === 'GET' && url === '/users') {
        return res
            .setHeader('Content-Type', 'application/json')
            .end(JSON.stringify(users));
    }
    if (method === 'POST' && url === '/users') {
        if (req.body === null) {
            return res.writeHead(400).end('Invalid JSON');
        }

        const { name, email } = req.body;

        if (!name || !email) {
            return res.writeHead(400).end('Missing name or email');
        }

        users.push({
            id: 1,
            name,
            email,
        });

        return res.writeHead(201).end();
    }

    return res.writeHead(404).end();
});

server.listen(3333);