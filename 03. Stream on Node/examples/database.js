// import fs from 'node:fs/promises';  
const path = require('path');

const databasePath = path.join(__dirname, './database.json');

class Database {
    constructor() {
        this.database = {};
    }

    persist() {
        const data = JSON.stringify(this.database);
        fs.writeFile('data.json', data, (err) => {
            if (err) {
                console.error('Error writing to file:', err);
            } else {
                console.log('Data persisted successfully.');
            }
        });
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

module.exports = Database;
