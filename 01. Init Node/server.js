const http = require('http');
// Criar um usuário (name, email, password)

const server = http.createServer((req, res) => {
    return res.end('Hello  Ignite')
})

server.listen(3333);