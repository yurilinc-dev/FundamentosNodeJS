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

// import http from 'node:http'    
// import Database from './database.js' 
// import('./middleware/json.js').then((jsonModule) => {
    //     const json = jsonModule.default;
    
    //     // Use the 'json' module here
    //   }).catch((error) => {
        //     console.error('Failed to import the JSON module:', error);
        //   });
const Database = require('./database.js');
const http = require('http');
const json = require('../middleware/json.js')
// const { readFile } = require('fs').promises;


const database = new Database();

const server = http.createServer(async (req, res) => {
    const { method, url } = req;

    // await json(req, res)
    

    // Early return
    if (method === 'GET' && url === '/users') {
        const users = database.select('users')

        return res.setHeader('Content-Type', 'application/json')
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

        const user = {
            id: 1,
            name,
            email,
        }
        database.insert('users', user)

        return res.writeHead(201).end();
    }

    return res.writeHead(404).end();
});

server.listen(3333);