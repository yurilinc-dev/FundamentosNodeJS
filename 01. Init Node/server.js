const http = require('http');
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
*/
const server = http.createServer((req, res) => {
    const { method, url } = req
    //early return
    if (method === 'GET' && url === '/users'){
        return res.end('Listagem de usuários')
    }
    if (method === 'POST' && url === '/users'){
        return res.end('Criação de usuários')
    }
    
    return res.end('Hello  World')
})

server.listen(3333);