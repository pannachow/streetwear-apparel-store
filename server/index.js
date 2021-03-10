const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const cors = require('cors');
require('dotenv').config();

const port = parseInt(process.env.PORT || '3001');

const app = express();

app.use(cors());
app.use(bodyParser.json());

async function execute(sql, values) {
    const conn = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME || 'shop',
    });
    const res = await conn.execute(sql, values);
    // we got max number of connections exceeded error without closing
    await conn.close();
    return res;
}

app.get('/product', async (req, res) => {
    try {
        const [rows] = await execute('SELECT * FROM product');
        res.send(rows);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

app.get('/basket', async (req, res) => {
    try {
        const [rows] = await execute('SELECT * FROM basket');
        res.send(rows);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

app.post('/basket', async (req, res) => {
    try {
        await execute(
            'INSERT INTO basket (product_id, quantity) VALUES (?, ?)',
            [req.body.product_id, req.body.quantity]
        );
        res.status(201).send(req.body);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

app.put('/basket', async (req, res) => {
    try {
        await execute(
            'UPDATE basket SET quantity=? WHERE product_id=?',
            [req.body.quantity, req.body.product_id]
        );
        res.status(200).send(req.body);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

app.delete('/basket', async (req, res) => {
    try {
        await execute(
            'DELETE FROM basket WHERE product_id=?',
            [req.body.product_id]
        );
        res.status(200).send(req.body);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

app.listen(port, () => {
    console.log(`Shop app listening at http://localhost:${port}`);
});
