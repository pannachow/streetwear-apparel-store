const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

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

app.post('/basket', async (req, res) => {
    try {
        const connection = await connect();
        await connection.execute(
            'INSERT INTO basket (product_id, quantity) VALUES (?, ?)',
            [req.body.product_id, req.body.quantity]
        );
        res.status(201).send(req.body);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.put('/basket', async (req, res) => {
    try {
        const connection = await connect();
        await connection.execute(
            'UPDATE basket SET quantity=? WHERE product_id=?',
            [req.body.quantity, req.body.product_id]
        );
        res.status(200).send(req.body);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.delete('/basket', async (req, res) => {
    try {
        const connection = await connect();
        await connection.execute(
            'DELETE FROM basket WHERE product_id=?',
            [req.body.product_id]
        );
        res.status(200).send(req.body);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.listen(port, () => {
    console.log(`Shop app listening at http://localhost:${port}`)
});
