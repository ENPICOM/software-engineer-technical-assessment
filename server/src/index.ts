import express from 'express';
import sql from 'sql-template-strings';
import { db } from './db';

const { PORT } = process.env;

const app = express();

app.use(express.json());
app.use((req, res, next) => {
    res.on('finish', () => {
        console.log(`[${new Date().toISOString()}]  ${req.path}  ${res.statusCode}  ${JSON.stringify(req.body)}`);
    });
    next();
});

app.get('/api/hello', async (req, res) => {
    const message = (await db.query(sql`SELECT 'ENPICOM';`)).rows[0]['?column?'];

    res.json({ message });
});

app.listen(+(PORT ?? 8000), '0.0.0.0', () => {
    console.log(`DNA API listening on port ${PORT}`);
});
