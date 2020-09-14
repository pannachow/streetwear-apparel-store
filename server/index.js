const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const mysql = require('mysql2/promise');
require('dotenv').config();

const app = new Koa();
const router = new Router();

router.get('/product', async (ctx, next) => {
    const [rows] = await ctx.connection.execute('SELECT * FROM product');
    ctx.body = rows;
});

router.get('/basket', async (ctx, next) => {
    const [rows] = await ctx.connection.execute('SELECT * FROM basket');
    ctx.body = rows;
});

router.post('/basket', async (ctx, next) => {
    await ctx.connection.execute(
        'INSERT INTO basket (user, product) VALUES (?, ?)',
        [1, ctx.request.body.product],
    );
    ctx.status = 200;
});

router.delete('/basket', async (ctx, next) => {
    await ctx.connection.execute(
        'DELETE FROM basket WHERE user=? AND product=?',
        [1, ctx.request.body.product],
    );
    ctx.status = 200;
});

app
    .use(async (ctx, next) => {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: 'shop'
        });
        ctx.connection = connection;
        await next();
    })
    .use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(3001);
