const http = require('http');
const path = require('path');
const crypto = require('crypto');
const fs = require('fs').promises;

const databasePath = path.join(__dirname, 'database.json');


class Database {
  constructor() {
    this.database = {};

    fs.readFile(databasePath, 'utf8').then(data =>{
        this.database = JSON.parse(data)
    })
    .catch(() => {
        this.persist()
    })
  }

  async persist() {
    try {
      const data = JSON.stringify(this.database);
      await fs.writeFile(databasePath, data);
      console.log('Data persisted successfully.');
    } catch (error) {
      console.error('Error writing to file:', error);
    }
  }

  select(table) {
    const data = this.database[table] ?? [];
    return data;
  }

  insert(table, data) {
    if (Array.isArray(this.database[table])) {
      this.database[table].push(data);
    } else {
      this.database[table] = [data];
    }
    this.persist();
    return data;
  }
}

const database = new Database();

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  if (method === 'GET' && url === '/users') {
    const users = database.select('users');

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(users));
  } else if (method === 'POST' && url === '/users') {
    try {
      const body = await getRequestBody(req);
      const { name, email } = JSON.parse(body);

      if (!name || !email) {
        res.writeHead(400);
        res.end('Missing name or email');
        return;
      }

      const user = {
        id: crypto.randomUUID(),
        name,
        email,
      };
      database.insert('users', user);

      res.writeHead(201);
      res.end();
    } catch (error) {
      console.error('Error parsing JSON:', error);
      res.writeHead(400);
      res.end('Invalid JSON');
    }
  } else {
    res.writeHead(404);
    res.end();
  }
});

function getRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      resolve(body);
    });
    req.on('error', (error) => {
      reject(error);
    });
  });
}

server.listen(3333);
