import pkg from 'pg';
import * as dotenv from 'dotenv';
dotenv.config();

const { Client } = pkg;

const db = new Client({
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASS,
    host: 'localhost',
    port: 5432,
    database: process.env.DB_NAME
});

db.connect();

export default db;
