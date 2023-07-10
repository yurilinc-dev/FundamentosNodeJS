/*
Query Parameters: URL Stateful  => Filtros, paginação, não-obrigatórios
Routes Parameters: Identificação de recurso
Request Body: Envio de informação de um formulário (HTTPs)

http://localhost:3333/users?userID=1&name=Yuri

GET http://localhost:3333/users/1
DELETE http://localhost:3333/users/1

POST http://localhost:3333/users

Edição e remoção do usuário
*/

const http    = require('http');
const routes  = require('./routes.js');
const json    = require('../middleware/json.js');

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  await json(req, res)

  const route = routes.find(route => {
    return route.method === method && route.path === url
  })

  if (route) {
    return route.handler(req, res)
  }

  return res.writeHead(404).end()
})

server.listen(3333)