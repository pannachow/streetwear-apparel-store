const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 3001;

app.use(cors());

function connect() {
    return mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: 'shop'
    });
}

app.get('/product', async (req, res) => {
    try {
        const connection = await connect();
        const [rows] = await connection.execute('SELECT * FROM product');
        res.send(rows);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get('/basket', async (req, res) => {
    try {
        const connection = await connect();
        const [rows] = await connection.execute('SELECT * FROM basket');
        res.send(rows);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.listen(port, () => {
    console.log(`Shop app listening at http://localhost:${port}`)
});
